import { create_car } from "@/app/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create_car,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}
