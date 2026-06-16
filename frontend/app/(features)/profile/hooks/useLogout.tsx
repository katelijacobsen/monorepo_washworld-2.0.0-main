import { logout } from "@/app/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => logout(),
    onSuccess: () => {
      // Ryd brugerens cache så useSession ikke giver gamle data
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });
}