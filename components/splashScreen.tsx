"use client";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [hasMeasured, setHasMeasured] = useState(false);
  const logoControls = useAnimationControls();
  const backdropControls = useAnimationControls();
  const logoRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    let raf: number | null = null;

    const updatePositions = () => {
      const logoEl = logoRef.current;
      if (!logoEl) return;

      const logoRect = logoEl.getBoundingClientRect();
      const startX = window.innerWidth / 2 - logoRect.width / 2;
      const startY = window.innerHeight / 2 - logoRect.height / 2;

      logoControls.set({
        x: startX,
        y: startY,
        scale: 1,
        opacity: 1,
      });

      const brandIcon = document.getElementById("courtease-brand-icon");
      if (brandIcon) {
        if (raf) {
          window.cancelAnimationFrame(raf);
          raf = null;
        }
        const targetRect = brandIcon.getBoundingClientRect();
        targetPosition.current = {
          x: targetRect.left + targetRect.width / 2 - logoRect.width / 2,
          y: targetRect.top + targetRect.height / 2 - logoRect.height / 2,
        };
      } else {
        targetPosition.current = null;
        if (raf) {
          window.cancelAnimationFrame(raf);
        }
        raf = window.requestAnimationFrame(updatePositions);
      }

      setHasMeasured(true);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      window.removeEventListener("resize", updatePositions);
    };
  }, [logoControls]);

  useEffect(() => {
    if (!hasMeasured) return;

    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const startTimer = setTimeout(() => {
      const target = targetPosition.current;

      const animation = target
        ? {
            x: target.x,
            y: target.y,
            scale: 0.45,
            opacity: 0,
          }
        : {
            scale: 0.6,
            opacity: 0,
          };

      void logoControls.start({
        ...animation,
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
      });

      void backdropControls.start({
        opacity: 0,
        transition: { duration: 0.4, ease: "easeInOut", delay: 0.35 },
      });

      hideTimer = setTimeout(() => setVisible(false), 900);
    }, 1100);

    return () => {
      clearTimeout(startTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [backdropControls, hasMeasured, logoControls]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={backdropControls}
      className="fixed inset-0 z-[9999] overflow-hidden bg-white dark:bg-[#0B0F10]"
      aria-hidden
    >
      <motion.div
        ref={logoRef}
        className="absolute h-32 w-32 sm:h-40 sm:w-40"
        style={{ top: 0, left: 0 }}
        initial={false}
        animate={logoControls}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <Image src="/logo.png" alt="CourtEase Splash" fill className="object-contain" priority />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
