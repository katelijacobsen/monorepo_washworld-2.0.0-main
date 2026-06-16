import { create_user } from "@/app/lib/api";
// importere useMutation for at kunne returnere pending, error, success og data
// den kan kun kaldes inde i en komponent
import { useMutation } from "@tanstack/react-query";


export function useSignup() {
    return useMutation({
        mutationFn: create_user,
    })
}