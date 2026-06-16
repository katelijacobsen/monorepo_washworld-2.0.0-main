"use client";

import Card from "./Card";
import type { Location } from "../hooks/useFilterLocations";
import { useFilterLocations } from "../hooks/useFilterLocations";
import Icon from "@/app/global/components/Icon";
import Button from "@/app/global/components/Button";

interface LocationSearchProps {
  locations: Location[];
}

const LocationSearch = ({ locations }: LocationSearchProps) => {
  const { search, setSearch, filteredLocations, filter, setFilter, filters } =
    useFilterLocations(locations);

  return (
    <>
      <div className="flex items-center gap-6 pl-8 mt-32 mb-20 text-primary-600 bg-surface border-primary-100 border-2 rounded-4 w-full">
        <Icon iconName="search" size="sm"></Icon>
        <input
          placeholder="Søg..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-surface rounded-4 text-text py-8 px-8 w-full "
        />
        {/* Drop down filter til regioner */}
        <div>
          {
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              {filters.map((filter) => (
                <option key={filter} value={filter}>
                  {" "}
                  {filter === "Alle" ? "Alle regioner" : filter}
                </option>
              ))}
            </select>
          }
        </div>
      </div>
      <h1 className="text-xl font-bold mb-8">Find vaskehal</h1>
      <div className="flex flex-col gap-16 overflow-y-auto pr-4">
        {filteredLocations.map((location) => (
          <Card key={location.location_pk} location={location} />
        ))}
      </div>
    </>
  );
};

export default LocationSearch;
