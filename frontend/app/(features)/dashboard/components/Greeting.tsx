"use client";

import { useSession } from "@/app/(features)/profile/hooks/useSession";

export default function Greeting() {
  const sessionQuery = useSession();
  const firstName =
    sessionQuery.data?.user_fullname?.split(" ")[0] ?? "der";

  return (
    <h1 className="text-xl font-bold text-text">Hej {firstName}!</h1>
  );
}
