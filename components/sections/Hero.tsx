"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { model, img } from "@/data/model-profile";

const cover = img("cover");
const NAME = "ZERZOUR".split("");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Background image — large, parallax */}
      <motion.div
        style={reduce ? undefined : { y: yImg, scale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover opacity-95"
          style={{ objectPosition: cover.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)]/30 via-[var(--paper)]/5 to-[var(--paper)]/90" />
      </motion.div>

      {/* Top metadata strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 4, duration: 0.8 }}
        className="absolute inset-x-0 top-20 z-10 flex flex-wrap items-baseline justify-between gap-3 px-5 sm:px-8"
      >
        <span className="tracking-meta text-[var(--ink)]/65">
          Portfolio · MMXXV
        </span>
        <span className="tracking-meta text-[var(--ink)]/65">
          Marseille · Paris · Milan · London
        </span>
      </motion.div>

      {/* Name — XXL editorial */}
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-16 sm:px-8 sm:pb-24"
      >
        <h1 className="font-display leading-[0.82] text-[18vw] sm:text-[16vw]">
          <span className="block overflow-hidden">
            {NAME.map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: reduce ? 0 : 4 + i * 0.06,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
          </span>
          <span className="ml-[16vw] block overflow-hidden text-[14vw] italic text-[var(--ink-soft)] sm:text-[12vw]">
            {"JUBA".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: reduce ? 0 : 4.4 + i * 0.06,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-12 gap-4 sm:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 4.8, duration: 0.8 }}
            className="col-span-12 max-w-md font-display text-xl italic text-[var(--ink-soft)] sm:col-span-5 sm:text-2xl"
          >
            “{model.tagline}”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 5, duration: 0.8 }}
            className="col-span-12 flex flex-col items-start gap-3 sm:col-span-3 sm:col-start-8"
          >
            <a
              href="#gallery"
              className="group relative inline-flex items-center gap-3 rounded-full border border-[var(--ink)] px-6 py-3 text-sm uppercase tracking-[0.28em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              View Portfolio
              <Arrow />
            </a>
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 px-2 py-2 text-sm uppercase tracking-[0.28em] text-[var(--ink)]/70 hover:text-[var(--ink)]"
            >
              Book Model
              <Arrow />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 5.2, duration: 0.8 }}
            className="col-span-12 sm:col-span-2 sm:col-start-11 sm:text-right"
          >
            <div className="tracking-meta text-[var(--ink)]/55">Issue</div>
            <div className="font-display text-3xl">N° 01</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Side label */}
      <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 rotate-[-90deg] origin-left lg:block">
        <span className="tracking-meta text-[var(--ink)]/55">
          Editorial · Runway · Commercial · Beauty
        </span>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 13L13 1M13 1H4M13 1V10"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
