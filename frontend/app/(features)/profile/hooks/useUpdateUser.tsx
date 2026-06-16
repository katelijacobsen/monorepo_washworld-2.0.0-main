import { update_user } from "@/app/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UpdateUser } from "@/app/global/types/global";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: update_user,

    // onMutate fires IMMEDIATELY when mutate() is called — before the request goes out
    onMutate: async (newData: UpdateUser) => {
      // 1. Cancel any in-flight refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["user"] });

      // 2. Snapshot the current cache value so we can roll back if needed
      const previousUser = queryClient.getQueryData<User>(["user"]);

      // 3. Optimistically update the cache with the new values right now
      queryClient.setQueryData<User>(["user"], (old) =>
        old ? { ...old, ...newData } : old
      );

      // 4. Return the snapshot as context — onError will receive it
      return { previousUser };
    },

    // onError fires if the server rejects the update
    // context is whatever onMutate returned
    onError: (_error, _newData, context) => {
      if (context?.previousUser) {
        // Roll back the cache to the snapshot we took in onMutate
        queryClient.setQueryData(["user"], context.previousUser);
      }
    },

    // onSettled replaces onSuccess here — it fires after success OR error.
    // After onError rolls back the cache, we still want to refetch from the server to confirm sync.
    // onSuccess alone would skip that refetch on failure, leaving the cache unconfirmed.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
