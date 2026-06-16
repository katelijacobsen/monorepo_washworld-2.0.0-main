"use client";
import { useParams } from "next/navigation";
import LocationMap from "../components/LocationMap";
import { useSingleLocation } from "../hooks/useSingleLocation";
import Header from "@/app/global/components/Header";
import Link from "next/link";
import Button from "@/app/global/components/Button";
import { useDrag } from "../hooks/useDrag";

export default function SingleLocationPage() {
  const { location_pk } = useParams<{ location_pk: string }>();
  const { data: location, isPending, isError } = useSingleLocation(location_pk);
  const { sheetStyle, handleProps } = useDrag();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Couldn't fetch carwash</p>;

  return (
    <>
      <Header
        title={location.location_city}
        backButton={{
          elementType: "link",
          goBack: true,
          size: "sm",
          type: "none",
          iconName: "back",
        }}
      />
      <main className="relative overflow-hidden">
        <section className="absolute z-10 w-full bottom-0 p-16 bg-surface rounded-t-12" style={sheetStyle} {...handleProps}>
          <span className="border-primary-400 border-4 h-4 w-1/4 absolute inset-0 my-16 m-auto rounded-full"></span>
          <section className="my-12">
          <h2 className="text-lg font-bold">{location.location_city}</h2>
          <h3 className="text-base font-medium">{location.location_address}</h3>
          <div className="flex justify-between gap-16 py-16">
            <Button type="tertiary" size="lg" buttonName="Google Maps" />
            <Button type="tertiary" size="lg" buttonName="Apple Kort" />
          </div>
          </section>
          <div className="space-y-16 pb-16">
            <Button size="lg" buttonName="Vælg Vaskehal" />
            <Button type="secondary" size="lg" buttonName="Selv vask" />
          </div>
        </section>
        <LocationMap
          latitude={Number(location.location_latitude)}
          longitude={Number(location.location_longtitude)}
        />
      </main>
    </>
  );
}
