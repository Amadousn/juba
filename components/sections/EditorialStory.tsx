"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { img } from "@/data/model-profile";

const chapters = [
  {
    n: "I",
    title: "Stillness",
    body: "There is a quality to Juba's frame that does not perform — it holds. The studio light catches the jawline, the gaze drifts past camera. Nothing is rushed.",
    image: img("beauty"),
  },
  {
    n: "II",
    title: "Movement",
    body: "Then the body shifts — posture loose, hands at rest. The space around him does the work; he simply occupies it. Streetwear becomes editorial without trying.",
    image: img("studio-fulllength"),
  },
  {
    n: "III",
    title: "Presence",
    body: "By the third frame the story is already told. A hood, a corridor, a glance off-axis. The image refuses to explain itself — and that is the work.",
    image: img("lifestyle-hoodie"),
  },
];

export function EditorialStory() {
  return (
    <section
      id="story"
      className="relative border-t border-[var(--line)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <header className="flex items-baseline justify-between border-b border-[var(--line)] pb-6">
          <span className="tracking-meta text-[var(--ink)]/55">§ 04 — Story</span>
          <span className="tracking-meta text-[var(--ink)]/55">Three chapters</span>
        </header>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display mt-10 text-[clamp(3rem,8vw,8rem)] leading-[0.9]"
        >
          A quiet <span className="italic">study</span>
        </motion.h2>

        <div className="mt-20 space-y-32 sm:space-y-48">
          {chapters.map((c, i) => (
            <Chapter key={c.n} chapter={c} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  reverse,
}: {
  chapter: (typeof chapters)[number];
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 items-center gap-6 sm:gap-12 ${
        reverse ? "sm:[direction:rtl]" : ""
      }`}
    >
      <motion.figure
        style={{ y: yImg, aspectRatio: 4 / 5 }}
        className="relative col-span-12 sm:col-span-7 sm:[direction:ltr]"
      >
        <motion.div style={{ scale }} className="absolute inset-0 overflow-hidden bg-[var(--paper-soft)]">
          <Image
            src={chapter.image.src}
            alt={chapter.image.alt}
            fill
            quality={95}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
            style={{ objectPosition: chapter.image.position }}
          />
        </motion.div>
      </motion.figure>

      <motion.div
        style={{ y: yText }}
        className="col-span-12 sm:col-span-5 sm:[direction:ltr]"
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display text-7xl italic text-[var(--ink)]/30">
            {chapter.n}
          </span>
          <span className="tracking-meta text-[var(--ink)]/55">Chapter</span>
        </div>
        <h3 className="font-display mt-4 text-5xl sm:text-6xl">
          {chapter.title}
        </h3>
        <p className="mt-6 max-w-md text-lg text-[var(--ink)]/75">
          {chapter.body}
        </p>
      </motion.div>
    </div>
  );
}
