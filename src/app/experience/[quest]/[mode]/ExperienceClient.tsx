"use client";

import { ToastProvider, useToast } from "@/components/toast";
import { QUEST_MAP, type QuestKey } from "@/data/quests";
import { useBadges } from "@/lib/badges";
import clsx from "clsx";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ExperienceClientProps {
  questKey: QuestKey;
  mode: "ar" | "demo";
}

function ExperienceOverlay({ questKey, mode }: ExperienceClientProps) {
  const quest = QUEST_MAP[questKey];
  const router = useRouter();
  const { notify } = useToast();
  const { addBadge, hasBadge } = useBadges();
  const [infoOpen, setInfoOpen] = useState(true);
  const [mediaVisible, setMediaVisible] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (mode === "ar") {
      notify(
        "Aktifkan layanan lokasi lalu dekati koordinat situs untuk memunculkan marker hologram."
      );
      setMediaVisible(false);
    } else {
      notify("Demo Mode aktif — kamera dan GPS tidak diperlukan.");
      setMediaVisible(true);
    }
  }, [mode, notify]);

  useEffect(() => {
    if (mode !== "ar") return;

    let hasAnnounced = false;
    const handleGps = () => {
      if (!hasAnnounced) {
        hasAnnounced = true;
        notify("Lokasi ditemukan. Sentuh marker hologram untuk membuka arsip situs.");
      }
    };

    window.addEventListener("gps-camera-update-position", handleGps as EventListener);
    return () => {
      window.removeEventListener(
        "gps-camera-update-position",
        handleGps as EventListener
      );
    };
  }, [mode, notify]);

  const revealMedia = useCallback(() => {
    setMediaVisible((prev) => {
      if (!prev) {
        notify("Menampilkan arsip situs di overlay.");
      }
      return true;
    });
  }, [notify]);

  useEffect(() => {
    if (mode !== "ar") return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let cleanup: (() => void) | undefined;

    const attachListener = () => {
      const entity = document.querySelector("[data-quest-entity]");
      if (!entity) {
        timeout = setTimeout(attachListener, 300);
        return;
      }
      const handleClick = () => {
        revealMedia();
      };
      entity.addEventListener("click", handleClick);
      cleanup = () => {
        entity.removeEventListener("click", handleClick);
      };
    };

    attachListener();

    return () => {
      if (cleanup) cleanup();
      if (timeout) clearTimeout(timeout);
    };
  }, [mode, revealMedia]);

  const questTitle = useMemo(
    () => (mode === "demo" ? `${quest.title} — DEMO` : quest.title),
    [mode, quest.title]
  );

  const handleComplete = () => {
    if (!hasBadge(questKey)) {
      addBadge(questKey);
      notify("Lencana didapat!");
    } else {
      notify("Quest ini sudah kamu selesaikan.");
    }
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-slate-100">
      {mode === "ar" ? (
        <>
          <Script
            src="https://aframe.io/releases/1.4.2/aframe.min.js"
            strategy="beforeInteractive"
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/ar.js@3.4.2/aframe/build/aframe-ar.js"
            strategy="beforeInteractive"
          />
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#155e75_0%,transparent_55%)] opacity-60" />

      <div className="relative z-10 flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur">
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Quest</p>
            <h2 className="text-lg font-semibold">{questTitle}</h2>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              className="pointer-events-auto rounded-full bg-gradient-to-r from-cyan-400 to-brand-dark px-4 py-2 text-xs font-semibold text-slate-950"
              onClick={handleComplete}
            >
              Selesaikan Quest
            </button>
            <button
              className="pointer-events-auto rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white"
              onClick={() => setInfoOpen((prev) => !prev)}
            >
              Info
            </button>
            <button
              className="pointer-events-auto rounded-full border border-red-400/70 px-4 py-2 text-xs font-semibold text-red-300"
              onClick={handleExit}
            >
              Keluar
            </button>
          </div>
        </div>

        <div
          className={clsx(
            "pointer-events-auto max-w-lg rounded-3xl border border-white/10 bg-black/60 p-5 shadow-xl backdrop-blur transition-all",
            infoOpen ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={!infoOpen}
        >
          <h3 className="text-lg font-semibold">{quest.title}</h3>
          <p className="mt-2 text-sm text-slate-200">{quest.story}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-brand">
            {quest.tags.join(" • ")}
          </p>
          <p className="mt-3 text-[11px] font-mono text-slate-400">
            Koordinat: {quest.coord.lat.toFixed(6)}, {quest.coord.lon.toFixed(6)}
          </p>
        </div>

        <div className="pointer-events-auto max-w-lg rounded-3xl border border-white/10 bg-black/60 p-5 shadow-xl backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Arsip Situs</h3>
            <button
              className="rounded-full border border-white/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
              onClick={() => {
                if (mediaVisible) {
                  setMediaVisible(false);
                } else {
                  revealMedia();
                }
              }}
            >
              {mediaVisible ? "Tutup" : "Buka"}
            </button>
          </div>
          {mediaVisible ? (
            <div className="space-y-3">
              {quest.media.type === "video" ? (
                <video
                  className="w-full rounded-2xl border border-white/10"
                  controls
                  playsInline
                  poster={quest.media.poster}
                >
                  <source src={quest.media.src} />
                  Browser tidak mendukung pemutar video bawaan.
                </video>
              ) : (
                <img
                  src={quest.media.src}
                  alt={`Arsip ${quest.title}`}
                  className="w-full rounded-2xl border border-white/10 object-cover"
                />
              )}
              <p className="text-xs text-slate-200">{quest.media.caption}</p>
            </div>
          ) : (
            <button
              className="w-full rounded-2xl border border-dashed border-white/30 px-4 py-6 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200"
              onClick={revealMedia}
            >
              Sentuh marker AR untuk membuka arsip
            </button>
          )}
        </div>
      </div>

      <div className="relative z-0 flex-1">
        {mode === "ar" ? (
          <a-scene
            embedded
            vr-mode-ui="false"
            renderer="logarithmicDepthBuffer: true"
            arjs="sourceType: webcam; debugUIEnabled: false; videoTexture: true;"
            className="h-full w-full"
          >
            <a-entity
              data-quest-entity
              className="clickable"
              gps-entity-place={`latitude: ${quest.coord.lat}; longitude: ${quest.coord.lon};`}
              look-at="[gps-camera]"
              scale="2.5 2.5 2.5"
            >
              <a-cylinder
                position="0 0.6 0"
                radius="0.4"
                height="0.3"
                color="#0f172a"
                opacity="0.9"
              ></a-cylinder>
              <a-sphere
                position="0 1.1 0"
                radius="0.35"
                color="#22d3ee"
                opacity="0.85"
                animation__pulse="property=scale; dir=alternate; dur=1400; loop=true; to:1.2 1.2 1.2"
              ></a-sphere>
              <a-text
                value={quest.title}
                position="0 1.8 0"
                align="center"
                color="#f8fafc"
                width="6"
              ></a-text>
            </a-entity>
            <a-camera
              gps-camera
              rotation-reader
              position="0 0 0"
              cursor="fuse: false; rayOrigin: mouse"
              raycaster="objects: .clickable"
            ></a-camera>
          </a-scene>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-6 bg-[radial-gradient(circle_at_center,#0f172a,transparent_70%)]">
            <div className="h-36 w-36 rounded-3xl border border-cyan-200/40 bg-cyan-400/20 shadow-2xl" />
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Demo Overlay
              </p>
              <h3 className="text-2xl font-semibold">{questTitle}</h3>
              <p className="mt-2 text-sm text-slate-300">
                Gunakan mode ini untuk presentasi tanpa kamera.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperienceClient(props: ExperienceClientProps) {
  return (
    <ToastProvider>
      <ExperienceOverlay {...props} />
    </ToastProvider>
  );
}
