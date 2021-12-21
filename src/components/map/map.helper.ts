import { MapMarker } from "@/components/map/MapMarker";

/**
 * Возвращает самую крайние "северо-западную" и "юго-восточную" точки
 */
export const getMapBounds = (markers: MapMarker[]): Array<number[]> => {
  const lats: number[] = [];
  const long: number[] = [];

  markers.forEach((m: MapMarker) => {
    lats.push(m.latitude);
    long.push(m.longitude);
  });

  return [
    [Math.max(...lats), Math.min(...long)],
    [Math.min(...lats), Math.max(...long)],
  ];
};
