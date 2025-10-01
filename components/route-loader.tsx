"use client";

import { motion } from "framer-motion";
import { Volleyball } from "lucide-react";

type RouteLoaderProps = {
  message?: string;
};

export default function RouteLoader({ message = "Memuat pengalaman CourtEase…" }: RouteLoaderProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white/90 text-slate-700 backdrop-blur-sm dark:bg-slate-950/90 dark:text-slate-200">
      <motion.div
        initial={{ rotate: -12, scale: 0.92 }}
        animate={{ rotate: [ -12, 12, -12 ], scale: [0.92, 1.02, 0.92] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="grid h-16 w-16 place-items-center rounded-3xl bg-teal-500 text-white shadow-lg shadow-teal-500/30"
      >
        <Volleyball className="h-8 w-8" />
      </motion.div>

      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="h-1 w-40 overflow-hidden rounded-full bg-teal-500/20"
          initial="initial"
          animate="animate"
        >
          <motion.span
            className="block h-full w-full rounded-full bg-teal-500"
            variants={{
              initial: { x: "-100%" },
              animate: {
                x: ["-100%", "0%", "100%"],
              },
            }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300">{message}</p>
      </div>
    </div>
  );
}
