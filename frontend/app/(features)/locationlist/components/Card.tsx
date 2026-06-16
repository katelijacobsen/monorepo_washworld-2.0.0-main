import Icon from "@/app/global/components/Icon";
import Button from "@/app/global/components/Button";
import type { Location } from "../hooks/useFilterLocations";
import Link from "next/link";

interface CardProps {
  location: Location;
  innerCleanCount?: [number, number];
  washBayCount?: [number, number];
  distance?: string;
}

const Card = ({
  location,
  innerCleanCount = [1, 2],
  washBayCount = [3, 5],
  distance = "800M",
}: CardProps) => {
  return (
    <article className="rounded-4 border border-grey-100 overflow-hidden bg-surface-2">
      <div className="relative grid grid-cols-2 py-12 bg-primary-50">
        <div className="flex items-center justify-center gap-8 text-primary-600">
          <Icon iconName="vacuum" />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-sm font-bold">
              {innerCleanCount[0]}/{innerCleanCount[1]}
            </span>
            <span className="uppercase text-xs font-bold">Indre Bilpleje</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 text-primary-600">
          <Icon iconName="bubble" />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-sm font-bold">
              {washBayCount[0]}/{washBayCount[1]}
            </span>
            <span className="uppercase text-xs font-bold">Vaskehaller</span>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-full w-px bg-surface -translate-x-1/2 rotate-18"
        />
      </div>
      <div className="flex items-center justify-between px-16 py-16">
        <div className="flex items-start flex-col text-text">
          <div className="leading-tight flex items-center">
          <Icon iconName="location" />
            <h2 className="text-lg font-bold uppercase">
              {location.location_city}
            </h2>
          </div>
            <p className="uppercase text-xs pl-24">{location.location_address}</p>
        </div>
        <Link href={`/locationlist/${location.location_pk}`} className="text-xs text-text">
          {distance}
        </Link>
        <Icon iconName="next" />
      </div>
    </article>
  );
};

export default Card;
