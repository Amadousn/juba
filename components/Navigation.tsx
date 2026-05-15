"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { model, navigation } from "@/data/model-profile";
import { cn } from "@/lib/utils";

export function Navigation() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: reduce ? 0 : 3.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <a href="#top" className="group flex items-baseline gap-3">
            <span className="font-display text-lg sm:text-xl">
              {model.lastName}
            </span>
            <span className="tracking-meta hidden text-[var(--ink)]/55 sm:inline">
              {model.firstName}
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navigation.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="tracking-meta group relative text-[var(--ink)]/70 transition-colors hover:text-[var(--ink)]"
              >
                {n.label}
                <span className="absolute inset-x-0 -bottom-1 block h-px origin-left scale-x-0 bg-[var(--ink)] transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="hidden rounded-full border border-[var(--ink)] px-4 py-2 text-xs uppercase tracking-[0.28em] transition hover:bg-[var(--ink)] hover:text-[var(--paper)] sm:inline-block"
            >
              Book now
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="md:hidden"
            >
              <div className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-[var(--ink)]/40">
                <span className="h-px w-5 bg-[var(--ink)]" />
                <span className="h-px w-5 bg-[var(--ink)]" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[80] flex flex-col bg-[var(--ink)] text-[var(--paper)]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
              <span className="font-display text-lg">{model.lastName}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="tracking-meta text-[var(--paper)]/70"
              >
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6 sm:px-10">
              {navigation.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="border-t border-[var(--paper)]/15 px-6 py-6 sm:px-10">
              <div className="tracking-meta text-[var(--paper)]/55">Booking</div>
              <a href={`mailto:${model.contact.email}`} className="mt-2 block font-display text-2xl">
                {model.contact.email}
              </a>
              <a href={model.contact.instagramUrl} className="mt-1 block text-[var(--paper)]/70">
                {model.contact.instagram}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
