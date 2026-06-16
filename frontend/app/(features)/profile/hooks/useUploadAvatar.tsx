import { upload_avatar } from "@/app/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upload_avatar,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user"] }),
  });
}