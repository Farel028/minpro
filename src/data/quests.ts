export type QuestKey =
  | "tugu-pahlawan"
  | "museum-surabaya"
  | "monkasel"
  | "balai-pemuda";

export interface QuestMedia {
  type: "video" | "image";
  src: string;
  poster?: string;
  caption: string;
}

export interface Quest {
  key: QuestKey;
  title: string;
  story: string;
  coord: {
    lat: number;
    lon: number;
  };
  tags: string[];
  media: QuestMedia;
}

export const QUESTS: Quest[] = [
  {
    key: "tugu-pahlawan",
    title: "Monumen Tugu Pahlawan",
    story:
      "Monumen utama kota Surabaya yang memperingati pertempuran 10 November dan menjadi simbol keberanian arek Suroboyo.",
    coord: { lat: -7.245786, lon: 112.737828 },
    tags: ["monumen", "sejarah", "kemerdekaan"],
    media: {
      type: "video",
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tugu_Pahlawan_Surabaya.jpg",
      caption:
        "Cuplikan arsip peringatan hari pahlawan yang menampilkan suasana upacara di kawasan Tugu Pahlawan."
    }
  },
  {
    key: "museum-surabaya",
    title: "Museum Surabaya (Gedung Siola)",
    story:
      "Gedung bersejarah yang menjadi saksi perkembangan perdagangan hingga pergerakan rakyat Surabaya sepanjang abad ke-20.",
    coord: { lat: -7.257548, lon: 112.737437 },
    tags: ["museum", "arsip", "perdagangan"],
    media: {
      type: "image",
      src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Gedung_Siola_Surabaya.jpg",
      caption:
        "Foto arsip fasad Gedung Siola yang kini difungsikan sebagai Museum Surabaya dengan koleksi memorabilia kota."
    }
  },
  {
    key: "monkasel",
    title: "Monumen Kapal Selam",
    story:
      "Kapal selam KRI Pasopati 410 yang dialihfungsikan menjadi museum pendidikan maritim dan menjadi ikon tepi Kalimas.",
    coord: { lat: -7.26284, lon: 112.750836 },
    tags: ["maritim", "angkatan laut", "museum"],
    media: {
      type: "image",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Monumen_Kapal_Selam_Surabaya.jpg",
      caption:
        "Potret interior Monkasel yang memperlihatkan ruang kendali asli kapal selam diesel era 1950-an."
    }
  },
  {
    key: "balai-pemuda",
    title: "Balai Pemuda",
    story:
      "Kompleks kesenian Art Deco yang menampung berbagai pertunjukan budaya dan aktivitas kreatif warga Surabaya.",
    coord: { lat: -7.262185, lon: 112.743461 },
    tags: ["art deco", "kebudayaan", "pertunjukan"],
    media: {
      type: "image",
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Balai_Pemuda_Surabaya.jpg",
      caption:
        "Dokumentasi gedung Balai Pemuda pada malam hari dengan pencahayaan yang menonjolkan detail Art Deco."
    }
  }
];

export const QUEST_MAP: Record<QuestKey, Quest> = QUESTS.reduce(
  (acc, quest) => {
    acc[quest.key] = quest;
    return acc;
  },
  {} as Record<QuestKey, Quest>
);
