"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import clsx from "clsx";

interface ToastMessage {
  id: number;
  text: string;
}

interface ToastContextValue {
  notify: (text: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast harus dipakai di dalam ToastProvider");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const notify = useCallback((text: string) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((item) => item.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                "rounded-full border border-white/30 bg-black/70 px-4 py-2 text-sm shadow-lg backdrop-blur",
                "toast-pop"
              )}
              role="status"
              aria-live="polite"
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
