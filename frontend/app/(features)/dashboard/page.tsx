import { connection } from "next/server";
import Header from "@/app/global/components/Header";
import { getEventLocations } from "@/app/lib/api";
import Greeting from "./components/Greeting";
import PromoCard from "./components/PromoCard";
import LocationCard from "./components/LocationCard";
import Co2Card from "./components/Co2Card";
import { Location } from "../locationlist/hooks/useFilterLocations";

export default async function DashboardPage() {
  // Prerendering stopper her — dashboardet renderes ved hvert request,
  // så build kan køre uden at backend er oppe
  await connection();

  let locations: Awaited<ReturnType<typeof getEventLocations>> = [];
  try {
    locations = await getEventLocations();
  } catch {
    locations = [];
  }

  const fallback: Location[] = [
    {
      location_pk: "fallback-1",
      location_title: "Herlev",
      location_city: "Herlev",
      location_address: "",
      location_region: "Sjælland",
      location_latitude: "55.723",
      location_longtitude: "12.439",
      location_carwash_max: "00",
      location_carwash_in_use: "00",
      location_selfwash_max: "00",
      location_selfwash_in_use: "00",
      location_insideclean_max: "00",
      location_insideclean_in_use: "00",
    },
  ];

  const list = locations.length >= 2 ? locations.slice(0, 2) : fallback;

  return (
    <>
      <Header title="Hjem" />
      <main className="flex flex-col gap-24 py-24 bg-bg">
        <Greeting />
        <PromoCard />
        <LocationCard location={list[0]} showImage available />
        <LocationCard location={list[0]} available />
        <Co2Card kg={23.5} />
      </main>
    </>
  );
}
