"use client";

import { QUESTS } from "@/data/quests";
import { UMKM_LIST } from "@/data/umkm";
import { findNearestQuest, sortUmkmByDistance, type GeoPoint } from "@/lib/geo";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ToastProvider, useToast } from "@/components/toast";
import { useBadges } from "@/lib/badges";

function formatDistance(meters: number) {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
}

function HomeContent() {
  const router = useRouter();
  const { notify } = useToast();
  const { badges, hasBadge, reset } = useBadges();
  const [userPoint, setUserPoint] = useState<GeoPoint | null>(null);
  const [showNearest, setShowNearest] = useState(false);

  const sortedUmkm = useMemo(() => {
    if (!userPoint) return null;
    return sortUmkmByDistance(userPoint, UMKM_LIST);
  }, [userPoint]);

  type UmkmDisplay = (typeof UMKM_LIST)[number] & { distance?: number };

  const displayedUmkm: UmkmDisplay[] = useMemo(() => {
    if (showNearest && sortedUmkm) {
      return sortedUmkm.slice(0, 4).map(({ item, distance }) => ({
        ...item,
        distance
      }));
    }
    return UMKM_LIST.map((item) => ({ ...item }));
  }, [showNearest, sortedUmkm]);

  const handleOpenExperience = (questKey: string, mode: "ar" | "demo") => {
    router.push(`/experience/${questKey}/${mode}`);
  };

  const handleCheckLocation = () => {
    if (!navigator.geolocation) {
      notify("Geolocation tidak didukung di perangkat ini.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point: GeoPoint = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        setUserPoint(point);
        setShowNearest(false);
        const nearest = findNearestQuest(point, QUESTS);
        if (nearest) {
          notify(
            `Kamu ~${formatDistance(nearest.distance)} dari ${nearest.quest.title}.`
          );
        }
      },
      (error) => {
        notify(`Tidak bisa mendapatkan lokasi: ${error.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  };

  const handleShowNearest = () => {
    if (!userPoint) {
      notify("Aktifkan 'Cek Lokasi Saya' terlebih dahulu.");
      return;
    }
    setShowNearest(true);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 md:px-8">
      <header className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-brand">MVP</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Surabaya Heritage Quest
        </h1>
        <p className="text-sm text-slate-300">
          AR + Geolocation (Semi-Gamified)
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Mulai Eksplorasi</h2>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                Pilih Kampung
              </span>
            </div>
            <div className="space-y-4">
              {QUESTS.map((quest) => (
                <div
                  key={quest.key}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-inner"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-medium">{quest.title}</h3>
                      <p className="text-xs uppercase tracking-wide text-brand">
                        {quest.tags.join(" • ")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="rounded-full bg-gradient-to-r from-cyan-400 to-brand-dark px-4 py-2 text-sm font-semibold text-slate-950 shadow"
                        onClick={() => handleOpenExperience(quest.key, "ar")}
                      >
                        AR Mode
                      </button>
                      <button
                        className="rounded-full border border-cyan-200/40 px-4 py-2 text-sm font-semibold text-cyan-200"
                        onClick={() => handleOpenExperience(quest.key, "demo")}
                      >
                        Demo Mode
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-200">{quest.story}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Paspor Lencana</h2>
              <button
                className="text-xs text-slate-300 underline-offset-4 hover:underline"
                onClick={reset}
              >
                Reset Progres
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {QUESTS.map((quest) => (
                <div
                  key={quest.key}
                  className="flex h-24 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-center"
                >
                  <span className="text-3xl">{hasBadge(quest.key) ? "★" : "?"}</span>
                  <p className="mt-2 text-xs uppercase tracking-wide text-slate-300">
                    {quest.title}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              {badges.length > 0
                ? `Total lencana terkumpul: ${badges.length}/${QUESTS.length}`
                : "Belum ada lencana. Selesaikan quest untuk mendapat ★"}
            </p>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">UMKM Sekitar</h2>
            <span className="text-xs uppercase tracking-widest text-slate-400">
              {showNearest && userPoint ? "Terdekat" : "Default"}
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              className="rounded-full bg-gradient-to-r from-cyan-400 to-brand-dark px-4 py-2 text-xs font-semibold text-slate-950 shadow"
              onClick={handleCheckLocation}
            >
              Cek Lokasi Saya
            </button>
            <button
              className="rounded-full border border-cyan-200/40 px-4 py-2 text-xs font-semibold text-cyan-200"
              onClick={handleShowNearest}
            >
              Tampilkan yang Terdekat
            </button>
          </div>
          <ul className="space-y-3">
            {displayedUmkm.map((umkm) => (
              <li
                key={umkm.name}
                className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm shadow-inner"
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-semibold">{umkm.name}</p>
                  <span className="text-xs uppercase tracking-wide text-cyan-200">
                    {umkm.tag}
                  </span>
                </div>
                {typeof umkm.distance === "number" && userPoint ? (
                  <p className="mt-1 text-xs text-slate-300">
                    {formatDistance(umkm.distance)} dari posisimu
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <footer className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300 shadow-lg backdrop-blur">
        <p className="mb-2">
          Untuk demo AR Mode gunakan marker Hiro dengan pencahayaan cukup.
        </p>
        <a
          href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/three.js/examples/marker-training/examples/pattern-files/hiro.png"
          target="_blank"
          rel="noreferrer"
        >
          Unduh Marker Hiro →
        </a>
      </footer>
    </main>
  );
}

export default function Page() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
