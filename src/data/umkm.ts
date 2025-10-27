import type { QuestKey } from "./quests";

export interface Umkm {
  name: string;
  tag: string;
  coord: {
    lat: number;
    lon: number;
  };
  questKey?: QuestKey;
}

export const UMKM_LIST: Umkm[] = [
  {
    name: "Kopi Peneleh 1901",
    tag: "kopi",
    coord: { lat: -7.2489, lon: 112.7391 },
    questKey: "peneleh"
  },
  {
    name: "Batik Peneleh",
    tag: "busana",
    coord: { lat: -7.2501, lon: 112.7402 },
    questKey: "peneleh"
  },
  {
    name: "Roti Arab Ampel",
    tag: "kuliner",
    coord: { lat: -7.2256, lon: 112.7449 },
    questKey: "ampel"
  },
  {
    name: "Perpustakaan Kampung Ampel",
    tag: "buku",
    coord: { lat: -7.2268, lon: 112.7455 },
    questKey: "ampel"
  },
  {
    name: "Dolly Craft",
    tag: "kerajinan",
    coord: { lat: -7.2731, lon: 112.7142 },
    questKey: "dolly"
  },
  {
    name: "Sate Strenkali",
    tag: "kuliner",
    coord: { lat: -7.2825, lon: 112.7323 },
    questKey: "strenkali"
  },
  {
    name: "Strenkali Eco Print",
    tag: "busana",
    coord: { lat: -7.2827, lon: 112.7319 },
    questKey: "strenkali"
  },
  {
    name: "Dolly Beans",
    tag: "kopi",
    coord: { lat: -7.2745, lon: 112.7137 },
    questKey: "dolly"
  }
];
