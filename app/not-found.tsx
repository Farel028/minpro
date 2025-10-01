"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

export default function NotFound404() {
  const [dark, setDark] = useState(false);

  // Palette
  const TEAL_DARK = "#0D9488";
  const TEAL = "#14B8A6";
  const ORANGE_LIGHT = "#FB923C";
  const ORANGE = "#F97316";
  const WHITE = "#FFFFFF";
  const GRAY_SOFT = "#E5E7EB";

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 md:px-10 transition-colors duration-300 relative"
      style={{
        background: dark
          ? "radial-gradient(1200px 600px at 30% 10%, rgba(20,184,166,0.10), transparent), radial-gradient(900px 400px at 80% 90%, rgba(251,146,60,0.08), transparent), #0B1A1C"
          : "radial-gradient(1200px 600px at 30% 10%, rgba(20,184,166,0.08), transparent), radial-gradient(900px 400px at 80% 90%, rgba(251,146,60,0.08), transparent), #FFFFFF",
      }}
    >
      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDark((v) => !v)}
          className="rounded-2xl border px-3 py-1.5 text-sm shadow-sm hover:shadow transition-all"
          style={{
            background: dark ? TEAL_DARK : WHITE,
            color: dark ? WHITE : TEAL_DARK,
            borderColor: dark ? TEAL : GRAY_SOFT,
          }}
          aria-label="Toggle dark mode"
        >
          {dark ? "Dark Mode: On" : "Dark Mode: Off"}
        </button>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Copy */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col gap-6 order-2 md:order-1"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow"
              style={{ background: TEAL_DARK }}
            >
              CE
            </div>
            <h1
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: dark ? WHITE : "#0f172a" }}
            >
              Halaman Tidak Ditemukan
            </h1>
          </div>

          <p
            className="text-base md:text-lg"
            style={{ color: dark ? GRAY_SOFT : "#334155" }}
          >
            <strong
              className="font-semibold"
              style={{ color: dark ? WHITE : TEAL_DARK }}
            >
              Tenang
            </strong>
            , kita bantu balik ke lapangan. Kelihatannya bolanya nyasar dan{" "}
            <span className="whitespace-nowrap">kejebak di semak</span> luar
            garis.
          </p>

          <div className="flex flex-wrap gap-3">
            <MotionLink
              href="/"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-5 py-2 rounded-xl font-medium shadow transition focus:outline-none focus:ring"
              style={{ background: TEAL_DARK, color: WHITE }}
            >
              Kembali ke Beranda
            </MotionLink>

            <MotionLink
              href="/search"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-4 py-2 rounded-xl border transition focus:outline-none focus:ring"
              style={{
                color: dark ? WHITE : TEAL_DARK,
                borderColor: TEAL,
                background: dark ? "rgba(13,148,136,0.10)" : "transparent",
              }}
            >
              Cari Venue
            </MotionLink>

            <MotionLink
              href="/report-issue"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-4 py-2 rounded-xl border shadow-sm transition focus:outline-none focus:ring"
              style={{
                background: ORANGE_LIGHT,
                color: WHITE,
                borderColor: ORANGE,
              }}
            >
              Laporkan Masalah
            </MotionLink>
          </div>
        </motion.section>

        {/* RIGHT: Illustration — Basketball stuck in bush (simpler like given image) */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          className="flex items-center justify-center order-1 md:order-2"
        >
          <div className="relative w-full max-w-[420px] aspect-[4/3]">
            {/* Animated ball (Framer Motion) */}
            <motion.svg
              viewBox="0 0 420 315"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <motion.g
                initial={{ y: -6, rotate: -4 }}
                animate={{ y: [-6, 0, -3, 0], rotate: [-4, 0, -2, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                transform="translate(210,170)"
              >
                <ellipse
                  cx="0"
                  cy="86"
                  rx="70"
                  ry="12"
                  fill={dark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.12)"}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="90"
                  fill={ORANGE_LIGHT}
                  stroke="#1f2937"
                  strokeWidth="5"
                />
                <path d="M-90 0 H90" stroke="#1f2937" strokeWidth="5" />
                <path d="M0 -90 V90" stroke="#1f2937" strokeWidth="5" />
                <path
                  d="M-58 -58 C -28 -20, -28 20, -58 58"
                  stroke="#1f2937"
                  strokeWidth="5"
                  fill="none"
                />
                <path
                  d="M58 -58 C 28 -20, 28 20, 58 58"
                  stroke="#1f2937"
                  strokeWidth="5"
                  fill="none"
                />
                <circle cx="32" cy="-28" r="16" fill="rgba(255,255,255,0.4)" />
                <circle cx="50" cy="-18" r="8" fill="rgba(255,255,255,0.25)" />
              </motion.g>
            </motion.svg>

            {/* Grass PNG foreground overlay */}
            <Image
              src="/grass.png"
              alt="Ilustrasi semak dan rumput"
              fill
              priority={false}
              className="absolute inset-x-0 bottom-0 w-full select-none pointer-events-none object-cover"
              sizes="(max-width: 768px) 90vw, 420px"
            />
          </div>
        </motion.aside>
      </div>
    </main>
  );
}
