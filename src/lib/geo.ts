import type { Quest } from "@/data/quests";
import type { Umkm } from "@/data/umkm";

export interface GeoPoint {
  lat: number;
  lon: number;
}

export function distMeters(a: GeoPoint, b: GeoPoint): number {
  const R = 6371000;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const la1 = toRad(a.lat);
  const la2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(Math.max(0, h)));
}

export function findNearestQuest(point: GeoPoint, quests: Quest[]) {
  return quests
    .map((quest) => ({ quest, distance: distMeters(point, quest.coord) }))
    .sort((a, b) => a.distance - b.distance)[0];
}

export function sortUmkmByDistance(point: GeoPoint, umkm: Umkm[]) {
  return [...umkm]
    .map((item) => ({ item, distance: distMeters(point, item.coord) }))
    .sort((a, b) => a.distance - b.distance);
}
