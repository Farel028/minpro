"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { QuestKey } from "@/data/quests";

const STORAGE_KEY = "shq_badges_v1";

function readStorage(): QuestKey[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QuestKey[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Gagal membaca badge", error);
    return [];
  }
}

export function useBadges() {
  const [badges, setBadges] = useState<QuestKey[]>([]);

  useEffect(() => {
    setBadges(readStorage());
  }, []);

  const save = useCallback((next: QuestKey[]) => {
    setBadges(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }, []);

  const addBadge = useCallback(
    (key: QuestKey) => {
      setBadges((prev) => {
        if (prev.includes(key)) return prev;
        const next = [...prev, key];
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    save([]);
  }, [save]);

  const hasBadge = useCallback(
    (key: QuestKey) => badges.includes(key),
    [badges]
  );

  return useMemo(
    () => ({ badges, addBadge, reset, hasBadge }),
    [badges, addBadge, reset, hasBadge]
  );
}
