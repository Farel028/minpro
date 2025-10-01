"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionLink = motion(Link);
const ORANGE_LIGHT = "#FB923C";

export default function NotFound404() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 transition-colors duration-300 dark:bg-[#0B0F10] md:px-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90 [background:radial-gradient(1200px_600px_at_30%_10%,rgba(20,184,166,0.08),transparent),radial-gradient(900px_400px_at_80%_90%,rgba(251,146,60,0.08),transparent)] dark:[background:radial-gradient(1200px_600px_at_30%_10%,rgba(20,184,166,0.10),transparent),radial-gradient(900px_400px_at_80%_90%,rgba(251,146,60,0.08),transparent)]"
        aria-hidden
      />

      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* LEFT: Copy */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="order-2 flex flex-col gap-6 md:order-1"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 font-bold text-white shadow">
              CE
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 md:text-3xl">
              Halaman Tidak Ditemukan
            </h1>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 md:text-lg">
            <strong className="font-semibold text-teal-600 dark:text-teal-300">Tenang</strong>, kita bantu balik ke
            lapangan. Kelihatannya bolanya nyasar dan <span className="whitespace-nowrap">kejebak di semak</span> luar
            garis.
          </p>

          <div className="flex flex-wrap gap-3">
            <MotionLink
              href="/"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-xl bg-teal-600 px-5 py-2 font-medium text-white shadow transition focus:outline-none focus:ring focus:ring-teal-300/60 dark:bg-teal-500 dark:focus:ring-teal-400/40"
            >
              Kembali ke Beranda
            </MotionLink>

            <MotionLink
              href="/search"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-xl border border-teal-500 px-4 py-2 text-teal-600 transition focus:outline-none focus:ring focus:ring-teal-300/50 dark:border-teal-400 dark:bg-teal-500/10 dark:text-teal-200 dark:focus:ring-teal-400/40"
            >
              Cari Venue
            </MotionLink>

            <MotionLink
              href="/report-issue"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-xl border border-orange-500 bg-orange-400 px-4 py-2 text-white shadow-sm transition focus:outline-none focus:ring focus:ring-orange-300/60 dark:border-orange-400 dark:bg-orange-400/90"
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
                <ellipse cx="0" cy="86" rx="70" ry="12" className="fill-black/10 dark:fill-black/40" />
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
