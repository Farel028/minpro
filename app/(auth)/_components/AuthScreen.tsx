"use client";
import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type AuthMode = "login" | "register";

export default function AuthScreen({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-[#0B0F10] md:grid-cols-[1.15fr_1fr]">
      {/* Left visual panel */}
      <aside className="relative hidden min-h-[640px] md:block">
        {/* soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-cyan-400/10 to-orange-400/20 dark:from-teal-500/20 dark:via-teal-400/5 dark:to-orange-400/20" />
        {/* Court Illustration */}
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="relative aspect-[4/3] w-full max-w-[520px] rounded-2xl border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
            {/* Mini navbar dot */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FB923C]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#14B8A6]" />
            </div>

            {/* SVG court */}
            <svg viewBox="0 0 520 360" className="h-full w-full">
              {/* Court base */}
              <rect
                x="20"
                y="20"
                width="480"
                height="320"
                rx="24"
                className="fill-teal-50 dark:fill-teal-900/20"
              />
              <rect
                x="20"
                y="20"
                width="480"
                height="320"
                rx="24"
                className="fill-none stroke-[#0D9488]"
                strokeWidth="6"
              />
              {/* Center line */}
              <line
                x1="260"
                y1="20"
                x2="260"
                y2="340"
                className="stroke-[#0D9488]"
                strokeWidth="4"
                strokeDasharray="10 10"
              />
              {/* Hoops / Nets */}
              <circle
                cx="110"
                cy="180"
                r="50"
                className="fill-none stroke-[#0D9488]"
                strokeWidth="4"
              />
              <circle
                cx="410"
                cy="180"
                r="50"
                className="fill-none stroke-[#0D9488]"
                strokeWidth="4"
              />
              <rect
                x="95"
                y="165"
                width="30"
                height="30"
                rx="4"
                className="fill-orange-200/60 stroke-[#FB923C]"
                strokeWidth="3"
              />
              <rect
                x="395"
                y="165"
                width="30"
                height="30"
                rx="4"
                className="fill-orange-200/60 stroke-[#FB923C]"
                strokeWidth="3"
              />
              {/* Center circle */}
              <circle
                cx="260"
                cy="180"
                r="36"
                className="fill-none stroke-[#0D9488]"
                strokeWidth="4"
              />
            </svg>

            {/* Animated ball */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-500 bg-gradient-to-br from-[#FB923C] to-[#F97316] shadow-lg"
              animate={{ y: [0, -14, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0">
                <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-orange-600/50" />
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-orange-600/50" />
              </div>
            </motion.div>

            {/* Tagline bottom */}
            <div className="absolute inset-x-6 bottom-6">
              <p className="text-center text-sm font-medium text-teal-700 dark:text-teal-300">
                CourtEase — Book. Play. Enjoy.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right auth form */}
      <section className="relative flex min-h-[640px] items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {mode === "login" ? "Sign in" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {mode === "login"
                ? "Log in below or continue with your favorite provider."
                : "Join CourtEase to book lapangan dan gabung diskusi komunitas."}
            </p>
          </header>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[.99] dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label="Continue with Google"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  fill="#EA4335"
                  d="M12 10h10a10 10 0 1 1-3-7l-2.9 2.9A6 6 0 1 0 18 12h-6z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[.99] dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label="Continue with Facebook"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  fill="#1877F2"
                  d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12H16l-.4 2.9h-2.1v7A10 10 0 0 0 22 12"
                />
              </svg>
              Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px w-full bg-gray-200 dark:bg-white/10" />
            <span className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
              or
            </span>
            <span className="h-px w-full bg-gray-200 dark:bg-white/10" />
          </div>

          {/* Form fields */}
          <form className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input required className={inputCls} placeholder="Jane" />
                </Field>
                <Field label="Last name">
                  <input required className={inputCls} placeholder="Doe" />
                </Field>
              </div>
            )}

            <Field label="Email or username">
              <input
                required
                className={inputCls}
                type="email"
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Password">
              <div className="relative">
                <input
                  required
                  className={inputCls}
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    mode === "login" ? "••••••••" : "Min. 8 characters"
                  }
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 my-auto text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </Field>

            {mode === "register" && (
              <Field label="Confirm password">
                <input
                  required
                  className={inputCls}
                  type="password"
                  placeholder="••••••••"
                  minLength={8}
                />
              </Field>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-white/10"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="font-medium text-teal-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#14B8A6] px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#0D9488] active:scale-[.99]"
            >
              {mode === "login" ? "Log in" : "Create account"}
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              {mode === "login" ? (
                <>
                  New to CourtEase?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-[#14B8A6] hover:underline"
                  >
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#14B8A6] hover:underline"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </p>

            <p className="text-center text-xs text-gray-400 dark:text-gray-500">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-teal-400 dark:focus:ring-teal-900/40";
