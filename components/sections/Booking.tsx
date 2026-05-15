"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { model } from "@/data/model-profile";

export function Booking() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-6%"]);

  return (
    <section
      ref={ref}
      id="booking"
      className="relative isolate overflow-hidden bg-[var(--ink)] py-32 text-[var(--paper)] sm:py-48"
    >
      {/* Mega name in background */}
      <motion.div
        style={{ y }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center"
      >
        <div className="font-display text-[clamp(8rem,28vw,30rem)] leading-[0.8] tracking-tighter text-[var(--paper)]/[0.06]">
          JUBA
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <header className="flex items-baseline justify-between border-b border-[var(--paper)]/15 pb-6">
          <span className="tracking-meta text-[var(--paper)]/55">§ 07 — Booking</span>
          <span className="tracking-meta text-[var(--paper)]/55">{model.status.availability}</span>
        </header>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-16 text-[clamp(3.5rem,12vw,12rem)] leading-[0.85]"
        >
          Let's <span className="italic text-[var(--accent)]">work</span>
          <br />
          together.
        </motion.h2>

        <div className="mt-20 grid grid-cols-12 gap-8">
          <div className="col-span-12 sm:col-span-6">
            <div className="tracking-meta text-[var(--paper)]/55">Direct booking</div>
            <a
              href={`mailto:${model.contact.email}?subject=Booking%20—%20${model.fullName}`}
              className="group mt-3 inline-flex items-baseline gap-3 font-display text-3xl sm:text-4xl"
            >
              {model.contact.email}
              <span className="inline-block translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
                →
              </span>
            </a>

            <div className="mt-12 tracking-meta text-[var(--paper)]/55">Social</div>
            <a
              href={model.contact.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 block font-display text-3xl underline-offset-8 hover:underline sm:text-4xl"
            >
              {model.contact.instagram}
            </a>
          </div>

          <div className="col-span-12 sm:col-span-6">
            <div className="tracking-meta text-[var(--paper)]/55">Based in</div>
            <div className="mt-3 font-display text-3xl">{model.location.base}, France</div>

            <div className="mt-8 tracking-meta text-[var(--paper)]/55">Travels</div>
            <div className="mt-3 font-display text-3xl">
              {model.location.cities.join(" / ")}
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href={`mailto:${model.contact.email}`}
                className="inline-flex items-center gap-3 rounded-full bg-[var(--paper)] px-7 py-4 text-sm uppercase tracking-[0.28em] text-[var(--ink)] transition hover:bg-[var(--accent)]"
              >
                Book now →
              </a>
              <a
                href="#top"
                className="inline-flex items-center gap-3 rounded-full border border-[var(--paper)]/40 px-7 py-4 text-sm uppercase tracking-[0.28em] text-[var(--paper)] transition hover:border-[var(--paper)]"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
