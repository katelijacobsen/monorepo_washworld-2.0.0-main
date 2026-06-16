import { patch_car } from "@/app/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRestoreCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: patch_car,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cars"] }), // listen genhentes → bilen dukker op igen
  });
}
