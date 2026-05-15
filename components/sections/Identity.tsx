"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { model, img } from "@/data/model-profile";

const portrait = img("beauty");
const detail = img("studio-fulllength");

const WORDS = model.manifesto.split(" ");

export function Identity() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section
      id="identity"
      ref={ref}
      className="relative border-t border-[var(--line)] py-24 sm:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-4 gap-y-10 px-5 sm:gap-x-6 sm:px-8">
        {/* Section label */}
        <div className="col-span-12 flex items-baseline justify-between sm:col-span-12">
          <span className="tracking-meta text-[var(--ink)]/55">§ 01 — Identity</span>
          <span className="tracking-meta text-[var(--ink)]/55">{model.location.base}, FR</span>
        </div>

        {/* Big italic intro */}
        <div className="col-span-12 lg:col-span-12">
          <motion.p
            className="font-display text-[clamp(2.4rem,5.8vw,5.6rem)] italic leading-[1.02]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.025 }}
          >
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block whitespace-pre"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {w + " "}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Image A — portrait, offset */}
        <motion.figure
          style={{ y: yA, rotate: rot }}
          className="relative col-span-12 mt-10 aspect-[845/1040] sm:col-span-5 sm:col-start-1 sm:mt-20"
        >
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            quality={95}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
            style={{ objectPosition: portrait.position }}
          />
          <figcaption className="absolute -bottom-6 left-0 tracking-meta text-[var(--ink)]/60">
            02 / Beauty — Studio
          </figcaption>
        </motion.figure>

        {/* Bio + detail */}
        <div className="col-span-12 sm:col-span-6 sm:col-start-7 sm:mt-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-prose text-[var(--ink)]/80 sm:text-lg"
          >
            {model.bioLong}
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-6">
            <Datum label="Native" value="French" />
            <Datum label="Languages" value="FR · EN" />
            <Datum label="Hair" value={model.measurements.hair} />
            <Datum label="Eyes" value={model.measurements.eyes} />
          </div>
        </div>

        {/* Image B — smaller, floating */}
        <motion.figure
          style={{ y: yB }}
          className="relative col-span-8 col-start-3 aspect-[700/1035] sm:col-span-3 sm:col-start-9 sm:-mt-32"
        >
          <Image
            src={detail.src}
            alt={detail.alt}
            fill
            quality={95}
            sizes="(max-width: 768px) 60vw, 25vw"
            className="object-cover"
            style={{ objectPosition: detail.position }}
          />
        </motion.figure>
      </div>
    </section>
  );
}

function Datum({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="tracking-meta text-[var(--ink)]/55">{label}</div>
      <div className="mt-1 font-display text-xl">{value}</div>
    </div>
  );
}
