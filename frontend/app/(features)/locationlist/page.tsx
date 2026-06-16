import { connection } from "next/server";
import Header from "@/app/global/components/Header";
import LocationSearch from "./components/LocationSearch";
import { getEventLocations } from "@/app/lib/api";


export default async function Home() {
  // Prerendering stopper her — listen hentes ved hvert request
  await connection();
  const locations = await getEventLocations();

  return (
    <>
      <Header title="Bil vask"
      backButton={{ elementType: "link", goBack: true, size: "sm", type: "none", iconName: "back", }}/>
      <main>
        <LocationSearch locations={locations} />
      </main>
    </>
  );
}