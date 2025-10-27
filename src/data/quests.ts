export type QuestKey = "peneleh" | "ampel" | "dolly" | "strenkali";

export interface Quest {
  key: QuestKey;
  title: string;
  story: string;
  coord: {
    lat: number;
    lon: number;
  };
  tags: string[];
}

export const QUESTS: Quest[] = [
  {
    key: "peneleh",
    title: "Peneleh",
    story:
      "Kampung tua di Surabaya dengan jejak sejarah pergerakan nasional dan rumah-rumah kolonial yang masih terjaga.",
    coord: { lat: -7.2496, lon: 112.7396 },
    tags: ["heritage", "sejarah", "urban"]
  },
  {
    key: "ampel",
    title: "Ampel",
    story:
      "Kampung religi dengan Masjid Sunan Ampel dan suasana arabesque yang kental, pusat kuliner dan ziarah.",
    coord: { lat: -7.2262, lon: 112.7447 },
    tags: ["religi", "kuliner", "ziarah"]
  },
  {
    key: "dolly",
    title: "Dolly Reborn",
    story:
      "Kebangkitan kawasan Dolly sebagai ruang kreatif warga dengan UMKM baru dan narasi pemberdayaan.",
    coord: { lat: -7.2738, lon: 112.7135 },
    tags: ["kreatif", "transformasi", "komunitas"]
  },
  {
    key: "strenkali",
    title: "Strenkali",
    story:
      "Permukiman bantaran kali yang bertransformasi melalui gerakan warga menjaga lingkungan dan seni mural.",
    coord: { lat: -7.283, lon: 112.732 },
    tags: ["lingkungan", "komunitas", "mural"]
  }
];

export const QUEST_MAP: Record<QuestKey, Quest> = QUESTS.reduce(
  (acc, quest) => {
    acc[quest.key] = quest;
    return acc;
  },
  {} as Record<QuestKey, Quest>
);
