import { Guid } from "@/utils/Guid";

export class MapMarker {
  id = Guid.newGuid();
  title: string;
  latitude: number;
  longitude: number;
}
