"use client";

import "@/app/globals.css";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Sun, Moon, Volleyball } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// shadcn/ui components (assumed available in the project)
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Optional: if your app already uses next-themes, this toggle will respect it.
import { useTheme } from "next-themes";

/**
 * Courtease color tokens (Tailwind already configured with base colors).
 * We expose them as CSS variables so we can use them in inline styles & Motion.
 *
 * Teal:   #0D9488 / #14B8A6
 * Coral:  #FB923C / #F97316
 * White:  #FFFFFF
 * Gray:   #E5E7EB
 */

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/venues", label: "Venues" },
  { href: "/forum", label: "Forum" },
];

export default function CourteaseNavbar() {
  const pathname = usePathname() || "/";
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [openSearch, setOpenSearch] = React.useState(false);

  // Keyboard shortcut for quick search (Ctrl/Cmd + K)
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200/70 dark:border-slate-800/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/50"
      style={
        {
          "--teal": "#14B8A6",
          "--teal-deep": "#0D9488",
          "--coral": "#F97316",
          "--coral-soft": "#FB923C",
        } as React.CSSProperties
      }
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative grid h-9 w-9 place-items-center rounded-2xl bg-[var(--teal)] text-white shadow-sm shadow-[var(--teal)]/30 ring-1 ring-white/10 dark:ring-slate-700">
                <Volleyball className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <span className="font-semibold tracking-tight text-slate-800 dark:text-slate-100">
                Court<span className="text-[var(--coral)]">Ease</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <div className="hidden md:flex items-center">
            <div className="relative flex items-center gap-2 rounded-full border border-slate-200/70 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/40 px-1 py-1 shadow-sm">
              {LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors " +
                      (active
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white")
                    }
                  >
                    {active && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 -z-10 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        style={{
                          background:
                            "linear-gradient(135deg, var(--teal) 0%, var(--coral) 100%)",
                          boxShadow: "0 2px 10px rgba(20,184,166,0.25)",
                          opacity: 0.15,
                        }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => setOpenSearch(true)}
              aria-label="Open search (Ctrl+K)"
            >
              <Search className="h-5 w-5" />
            </Button>

            <ThemeToggle theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} />

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-slate-200 dark:border-slate-800"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[88%] sm:w-96">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-[var(--teal)] text-white">
                        <Volleyball className="h-4 w-4" />
                      </span>
                      Court<span className="text-[var(--coral)]">Ease</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 grid gap-2">
                    {LINKS.map((link) => {
                      const active =
                        pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={
                            "rounded-xl px-3 py-2 text-base font-medium transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/50 " +
                            (active
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-600 dark:text-slate-300")
                          }
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                    <div className="mt-2 flex gap-2">
                      <Button className="flex-1 bg-[var(--teal)] hover:bg-[var(--teal-deep)] text-white">
                        Login
                      </Button>
                      <Button
                        className="flex-1 border-[var(--coral)] text-[var(--coral)]"
                        variant="outline"
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-slate-700 dark:text-slate-200"
                >
                  Login
                </Button>
              </Link>
              <Button className="bg-[var(--teal)] hover:bg-[var(--teal-deep)] text-white">
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Command Palette */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search courts, venues, or topics…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Links">
            {LINKS.map((link) => (
              <CommandItem
                key={link.href}
                onSelect={() => (window.location.href = link.href)}
              >
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}

function ThemeToggle({
  theme,
  resolvedTheme,
  setTheme,
}: {
  theme?: string;
  resolvedTheme?: string;
  setTheme: (t: string) => void;
}) {
  // Pakai resolvedTheme biar akurat saat theme = "system"
  const isDark = (resolvedTheme ?? theme) === "dark";

  // Palette sama kayak di NotFound404
  const TEAL_DARK = "#0D9488";
  const TEAL = "#14B8A6";
  const WHITE = "#FFFFFF";
  const GRAY_SOFT = "#E5E7EB";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      className="rounded-2xl border px-3 py-1.5 text-sm shadow-sm hover:shadow transition-all flex items-center gap-2"
      style={{
        background: isDark ? TEAL_DARK : WHITE,
        color: isDark ? WHITE : TEAL_DARK,
        borderColor: isDark ? TEAL : GRAY_SOFT,
      }}
      aria-label="Toggle dark mode"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>

      <span className="text-xs font-medium">
        {isDark ? "Dark Mode: On" : "Dark Mode: Off"}
      </span>
    </button>
  );
}
