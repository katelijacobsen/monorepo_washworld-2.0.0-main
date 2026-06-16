import { api_user } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";


export function useSession() {
    return useQuery({
        queryKey: ["user"],
        queryFn: api_user,
        retry: false,
    })
}