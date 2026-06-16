"use client";

import { getSingleLocation } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Location } from "./useFilterLocations";

export function useSingleLocation(location_pk: string) {
  return useQuery<Location>({
    queryKey: ["location", location_pk],
    queryFn: () => getSingleLocation(location_pk),
    enabled: !!location_pk,
  });
}
