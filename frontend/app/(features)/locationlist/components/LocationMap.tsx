import Map, { Marker } from "react-map-gl/mapbox";
// If using with mapbox-gl v1:
// import Map from 'react-map-gl/mapbox-legacy';
import "mapbox-gl/dist/mapbox-gl.css";
import type { LocationMapProps } from "../types/location";

export default function LocationMap({ latitude, longitude }: LocationMapProps) {
  return (
    <Map
      mapboxAccessToken={(globalThis as any)?.process?.env?.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude,
        latitude,
        zoom: 14,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
    >
      <Marker latitude={latitude} longitude={longitude} color="#06C167"/>
    </Map>
  );
}
