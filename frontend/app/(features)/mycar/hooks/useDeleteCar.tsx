import { delete_car } from "@/app/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCar() {
    const qc = useQueryClient();
  return useMutation({
    mutationFn: delete_car,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cars"] }),
  });
}
