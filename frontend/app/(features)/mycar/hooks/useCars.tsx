import { get_cars } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: get_cars,
  });
}