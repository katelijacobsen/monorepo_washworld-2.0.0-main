import Icon from "@/app/global/components/Icon";
import type { Location } from "@/app/(features)/locationlist/hooks/useFilterLocations";

type Props = {
  location: Location;
  showImage?: boolean;
  available?: boolean;
  innerCleanCount?: [number, number];
  washBayCount?: [number, number];
};

export default function LocationCard({
  location,
  showImage = false,
  available = true,
  innerCleanCount = [3, 5],
  washBayCount = [3, 5],
}: Props) {
  return (
    <article className="overflow-hidden rounded-12 bg-bg-dark text-bg">
      {showImage && (
        <div
          className="aspect-16/9 bg-[linear-gradient(135deg,oklch(0.3_0.01_240)_0%,oklch(0.22_0.01_240)_55%,oklch(0.16_0.01_240)_100%)] flex items-end px-16 py-12"
          role="img"
          aria-label={`Billede af ${location.location_title}`}
        >
          <span className="uppercase text-xs font-bold tracking-wide text-bg">
            Wash World
          </span>
        </div>
      )}
      <div className="flex items-center justify-between px-16 py-12">
        <h3 className="text-lg font-bold">{location.location_title}</h3>
        <p className="flex items-center gap-8 uppercase text-xs">
          <span
            className={`inline-block w-[10px] h-[10px] rounded-full ${
              available ? "bg-primary-400" : "bg-danger"
            }`}
            aria-hidden="true"
          />
          {available ? "Tilgængelig" : "Optaget"}
        </p>
      </div>
      <div className="grid grid-cols-2 bg-primary-600 text-bg">
        <div className="flex items-center justify-center gap-8 py-8 border-r border-primary-800">
          <Icon iconName="vacuum" style="text-bg" />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-sm font-bold">
              {innerCleanCount[0]}/{innerCleanCount[1]}
            </span>
            <span className="uppercase text-xs">Indre Bilpleje</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 py-8">
          <Icon iconName="carline" style="text-bg" />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-sm font-bold">
              {washBayCount[0]}/{washBayCount[1]}
            </span>
            <span className="uppercase text-xs">Vaskehaller</span>
          </div>
        </div>
      </div>
    </article>
  );
}
