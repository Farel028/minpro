"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500); // 2.5 detik
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-[#0B0F10] z-[9999]"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="relative w-48 h-48"
      >
        <Image
          src="/logo.png"
          alt="CourtEase Splash"
          fill
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
