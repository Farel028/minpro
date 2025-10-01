"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-[#0B0F10]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-28 h-28 relative"
      >
        <Image
          src="/logo.png" // simpan logo ini di public/logo.png
          alt="CourtEase Logo"
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}
