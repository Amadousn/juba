"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { gallery } from "@/data/model-profile";

// Only the portrait-shaped images read well in the horizontal strip.
const STRIP_IMAGES = gallery.filter((g) => g.ratio < 1.1);
const STRIP = [...STRIP_IMAGES, ...STRIP_IMAGES];

export function Motion() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-22%"]);

  return (
    <section
      ref={ref}
      id="motion"
      className="relative overflow-hidden bg-[var(--ink)] py-24 text-[var(--paper)] sm:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <header className="flex items-baseline justify-between border-b border-[var(--paper)]/15 pb-6">
          <span className="tracking-meta text-[var(--paper)]/55">§ 05 — Motion</span>
          <span className="tracking-meta text-[var(--paper)]/55">Contact Sheet</span>
        </header>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display mt-10 text-[clamp(3rem,9vw,10rem)] leading-[0.9]"
        >
          In <span className="italic text-[var(--accent)]">motion</span>
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="mt-16 overflow-hidden border-y border-[var(--paper)]/15 py-6">
        <div
          className="marquee-track flex shrink-0 items-center gap-12 whitespace-nowrap text-[clamp(3rem,7vw,7rem)] leading-none font-display italic"
          aria-hidden
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Zerzour Juba
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
              Editorial · Runway · Commercial
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--paper)]/60" />
            </span>
          ))}
        </div>
      </div>

      {/* Horizontal scroll-driven contact sheet */}
      <div className="relative mt-16 overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-5 sm:px-8">
          {STRIP.map((img, i) => (
            <figure
              key={img.id + i}
              className="relative h-[60vh] w-[40vw] shrink-0 sm:w-[28vw]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={95}
                sizes="40vw"
                className="object-cover grayscale"
                style={{ objectPosition: img.position ?? "center" }}
              />
              <figcaption className="absolute bottom-3 left-3 tracking-meta text-[var(--paper)]/80">
                {String(i + 1).padStart(2, "0")} / {img.caption}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>

      <p className="mx-auto mt-16 max-w-2xl px-5 text-center text-[var(--paper)]/70 sm:px-8">
        A reel without the reel — a contact sheet you can drift through. Real
        footage on request.
      </p>
    </section>
  );
}
