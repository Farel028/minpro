"use client";

import { QUESTS } from "@/data/quests";
import { findNearestQuest, distMeters, type GeoPoint } from "@/lib/geo";
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

  const questDistances = useMemo(
    () =>
      QUESTS.map((quest) => ({
        quest,
        distance: userPoint ? distMeters(userPoint, quest.coord) : null
      })),
    [userPoint]
  );

  const nearestQuest = useMemo(() => {
    if (!userPoint) return null;
    return findNearestQuest(userPoint, QUESTS);
  }, [userPoint]);

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
        const nearest = findNearestQuest(point, QUESTS);
        if (nearest) {
          notify(
            `Kamu berada ~${formatDistance(nearest.distance)} dari ${nearest.quest.title}.`
          );
        }
      },
      (error) => {
        notify(`Tidak bisa mendapatkan lokasi: ${error.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
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
                Pilih Situs
              </span>
            </div>
            <div className="space-y-4">
              {questDistances.map(({ quest, distance }) => {
                const isNearest = nearestQuest?.quest.key === quest.key;
                return (
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
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span className="rounded-full border border-white/10 px-2 py-1 font-semibold uppercase tracking-wide">
                        {quest.coord.lat.toFixed(6)}, {quest.coord.lon.toFixed(6)}
                      </span>
                      {typeof distance === "number" ? (
                        <span
                          className={`rounded-full px-2 py-1 font-semibold uppercase tracking-wide ${
                            isNearest
                              ? "border border-cyan-200/60 text-cyan-100"
                              : "border border-white/10"
                          }`}
                        >
                          {isNearest ? "Terdekat" : "Jarak"}: {formatDistance(distance)}
                        </span>
                      ) : (
                        <span className="rounded-full border border-white/10 px-2 py-1 font-semibold uppercase tracking-wide">
                          Aktifkan lokasi untuk lihat jarak
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
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
            <h2 className="text-xl font-semibold">Navigasi Lokasi</h2>
            <span className="text-xs uppercase tracking-widest text-slate-400">
              {userPoint ? "Lokasi Aktif" : "Butuh GPS"}
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              className="rounded-full bg-gradient-to-r from-cyan-400 to-brand-dark px-4 py-2 text-xs font-semibold text-slate-950 shadow"
              onClick={handleCheckLocation}
            >
              Perbarui Posisi Saya
            </button>
          </div>
          <div className="space-y-4 text-sm text-slate-200">
            <p>
              Aktifkan lokasi untuk melihat jarak aktual ke setiap situs dan
              gunakan mode AR di lapangan. Titik virtual akan muncul di dekat
              koordinat berikut:
            </p>
            <ul className="space-y-2 text-xs">
              {QUESTS.map((quest) => (
                <li key={quest.key} className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="font-semibold text-slate-100">{quest.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-slate-300">
                    {quest.coord.lat.toFixed(6)}, {quest.coord.lon.toFixed(6)}
                  </p>
                </li>
              ))}
            </ul>
            {nearestQuest ? (
              <p className="rounded-xl border border-cyan-200/40 bg-cyan-200/10 p-3 text-xs text-cyan-100">
                Situs terdekat: <strong>{nearestQuest.quest.title}</strong> (
                {formatDistance(nearestQuest.distance)} dari posisimu)
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                Izinkan akses lokasi untuk mengetahui situs terdekat dan
                mengaktifkan penempatan marker GPS di AR mode.
              </p>
            )}
          </div>
        </aside>
      </section>

      <footer className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300 shadow-lg backdrop-blur">
        <p className="mb-2">
          Mode AR kini menggunakan koordinat GPS — pastikan GPS dan kompas
          perangkat aktif untuk presisi.
        </p>
        <p>
          Untuk presentasi tanpa lokasi, gunakan Demo Mode pada situs yang
          diinginkan.
        </p>
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
