"use client";

import { motion } from "framer-motion";
import { model } from "@/data/model-profile";

const STATS = [
  { label: "Height", value: `${model.measurements.height.value}`, unit: model.measurements.height.unit },
  { label: "Bust",   value: `${model.measurements.bust.value}`,   unit: model.measurements.bust.unit },
  { label: "Waist",  value: `${model.measurements.waist.value}`,  unit: model.measurements.waist.unit },
  { label: "Hips",   value: `${model.measurements.hips.value}`,   unit: model.measurements.hips.unit },
  { label: "Shoes",  value: `${model.measurements.shoes.value}`,  unit: model.measurements.shoes.unit },
  { label: "Hair",   value: model.measurements.hair,              unit: "" },
  { label: "Eyes",   value: model.measurements.eyes,              unit: "" },
];

export function ModelCard() {
  return (
    <section
      id="card"
      className="relative bg-[var(--ink)] py-24 text-[var(--paper)] sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex items-baseline justify-between border-b border-[var(--paper)]/15 pb-6">
          <span className="tracking-meta text-[var(--paper)]/55">§ 02 — Model Card</span>
          <span className="tracking-meta text-[var(--paper)]/55">Measurements</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-10 text-[clamp(3rem,8vw,9rem)] leading-[0.9]"
        >
          The <span className="italic text-[var(--accent)]">Card</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-4 lg:grid-cols-7">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group"
            >
              <div className="tracking-meta text-[var(--paper)]/55">{s.label}</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-5xl leading-none sm:text-6xl">
                  {s.value}
                </span>
                {s.unit && (
                  <span className="font-display text-base italic text-[var(--paper)]/60">
                    {s.unit}
                  </span>
                )}
              </div>
              <div className="mt-4 h-px w-12 origin-left scale-x-50 bg-[var(--paper)]/30 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-[var(--paper)]/15 pt-10">
          <div className="col-span-12 sm:col-span-4">
            <div className="tracking-meta text-[var(--paper)]/55">Categories</div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-display text-2xl">
              {model.categories.map((c, i) => (
                <span key={c}>
                  {c}
                  {i < model.categories.length - 1 && (
                    <span className="ml-3 text-[var(--paper)]/30">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-12 sm:col-span-4">
            <div className="tracking-meta text-[var(--paper)]/55">Based</div>
            <div className="mt-2 font-display text-2xl">{model.location.base}</div>
            <div className="text-[var(--paper)]/55">{model.location.cities.join(" · ")}</div>
          </div>
          <div className="col-span-12 sm:col-span-4">
            <div className="tracking-meta text-[var(--paper)]/55">Status</div>
            <div className="mt-2 inline-flex items-center gap-2 font-display text-2xl">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              {model.status.availability}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
