"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { model } from "@/data/model-profile";

const META = [
  { label: "Based", value: model.location.base },
  { label: "Cities", value: model.location.cities.join(" · ") },
  { label: "Height", value: `${model.measurements.height.value} ${model.measurements.height.unit}` },
  { label: "Categories", value: "Editorial · Runway · Commercial" },
  { label: "Status", value: model.status.availability },
];

const NAME_LETTERS = "ZERZOUR · JUBA".split("");

export function IntroLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Lock scroll while the loader plays
    const html = document.documentElement;
    html.style.overflow = "hidden";

    const totalMs = reduce ? 600 : 3600;
    const t = window.setTimeout(() => setVisible(false), totalMs);

    return () => {
      clearTimeout(t);
      html.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-[var(--ink)] text-[var(--paper)]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top bar */}
          <div className="flex items-baseline justify-between px-6 pt-6 sm:px-10 sm:pt-10">
            <motion.span
              className="tracking-meta text-[var(--paper)]/70"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Open Call · 2025
            </motion.span>
            <motion.span
              className="tracking-meta text-[var(--paper)]/70"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Portfolio · N° 01
            </motion.span>
          </div>

          {/* Center — name */}
          <div className="flex flex-1 items-center justify-center px-4">
            <h1 className="font-display text-center text-[14vw] leading-[0.9] sm:text-[12vw]">
              <span className="block overflow-hidden">
                {NAME_LETTERS.map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.35 + i * 0.04,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch === " " ? " " : ch}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          {/* Bottom — meta sheet */}
          <div className="border-t border-[var(--paper)]/15 px-6 pb-6 pt-5 sm:px-10 sm:pb-10">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-5">
              {META.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.08, duration: 0.6 }}
                >
                  <div className="tracking-meta text-[var(--paper)]/55">
                    {m.label}
                  </div>
                  <div className="mt-1 font-display text-lg sm:text-xl">
                    {m.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* progress bar */}
            <motion.div
              className="mt-6 h-px w-full origin-left bg-[var(--paper)]/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduce ? 0.3 : 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
