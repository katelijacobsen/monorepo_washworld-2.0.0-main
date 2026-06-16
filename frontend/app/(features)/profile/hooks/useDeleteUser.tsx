import { delete_user } from "@/app/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useDeleteUser() {
  return useMutation({
    mutationFn: delete_user,
  });
}