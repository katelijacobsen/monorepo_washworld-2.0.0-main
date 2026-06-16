"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/(features)/profile/hooks/useSession";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const sessionQuery = useSession();

  // Bruges hvis man ikke er logget på.
  // Automatisk sendes tilbage til auth siden
  useEffect(() => {
    if (sessionQuery.isError) router.push("/");
  }, [sessionQuery.isError, router]);


  if (sessionQuery.isPending) return <p>loading...</p>;
  if (!sessionQuery.data) return null;
  // Skal være efter for at kunne fange data efter loading

  return <>{children}</>;
}