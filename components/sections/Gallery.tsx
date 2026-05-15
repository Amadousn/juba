"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { gallery, type GalleryImage, type GalleryCategory } from "@/data/model-profile";

/**
 * Editorial gallery — composed as a sequence of magazine-style spreads.
 * Each row is hand-set: a different rhythm, a different focal point.
 * No image is forced into a wrong aspect ratio — every cadre uses the
 * photo's native ratio so nothing gets cut.
 */

type Filter = "all" | GalleryCategory;
const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Editorial", value: "editorial" },
  { label: "Beauty", value: "beauty" },
  { label: "Bodyshot", value: "bodyshot" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Polaroid", value: "polaroid" },
];

/**
 * Hand-composed spreads. Each entry describes one row of the gallery,
 * read like a magazine: row 1 is the editorial opener, row 2 the
 * polaroid contact sheet, row 3 the bodyshot story, etc.
 */
type Spread = {
  kind: "duo" | "trio" | "quad" | "solo";
  ids: string[];
  /** Vertical offsets (in vh-ish %) applied to each cell to break the line. */
  offsets?: number[];
  /** Optional kicker text shown above the spread */
  kicker?: string;
  /** Optional title that runs alongside */
  title?: string;
};

const SPREADS: Spread[] = [
  {
    kind: "solo",
    ids: ["cover"],
    kicker: "I — Cover",
    title: "Opening",
  },
  {
    kind: "trio",
    ids: ["polaroid-portrait", "beauty", "bodyshot-shoulder"],
    offsets: [0, 12, -6],
    kicker: "II — Studio",
    title: "Editorial",
  },
  {
    kind: "quad",
    ids: ["polaroid-a", "polaroid-b", "polaroid-c", "polaroid-d"],
    kicker: "III — Polaroids",
    title: "Open Call",
  },
  {
    kind: "duo",
    ids: ["bodyshot-leather", "bodyshot-studio"],
    offsets: [0, 8],
    kicker: "IV — Bodyshots",
    title: "On set",
  },
  {
    kind: "duo",
    ids: ["lifestyle-corridor", "lifestyle-hoodie"],
    offsets: [10, 0],
    kicker: "V — Lifestyle",
    title: "Off duty",
  },
  {
    kind: "solo",
    ids: ["studio-fulllength"],
    kicker: "VI — Closing",
    title: "Standalone",
  },
];

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const allowedIds = useMemo(() => {
    if (filter === "all") return new Set(gallery.map((g) => g.id));
    return new Set(gallery.filter((g) => g.category === filter).map((g) => g.id));
  }, [filter]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--paper-bright)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        {/* Header */}
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
          <div>
            <span className="tracking-meta text-[var(--ink)]/55">§ 03 — Portfolio</span>
            <h2 className="font-display mt-3 text-[clamp(3rem,8vw,8rem)] leading-[0.9]">
              <span className="block">The</span>
              <span className="block italic text-[var(--ink-soft)]">Gallery</span>
            </h2>
          </div>
          <p className="max-w-sm text-[var(--ink)]/70">
            Thirteen frames, composed as six magazine spreads. Each image keeps
            its native ratio — no forced crops, no cut hairlines.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-16 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition-all duration-300 ${
                    active
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--line-strong)] text-[var(--ink)]/65 hover:border-[var(--ink)] hover:text-[var(--ink)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <span className="tracking-meta text-[var(--ink)]/55">
            {allowedIds.size} / {gallery.length} frames
          </span>
        </div>

        {/* Spreads */}
        <div className="space-y-32 sm:space-y-48">
          {SPREADS.map((spread, i) => (
            <Spread key={i} spread={spread} index={i} allowedIds={allowedIds} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- spread renderer ----------------------- */

function Spread({
  spread,
  index,
  allowedIds,
}: {
  spread: Spread;
  index: number;
  allowedIds: Set<string>;
}) {
  const images = spread.ids
    .map((id) => gallery.find((g) => g.id === id))
    .filter((g): g is GalleryImage => !!g && allowedIds.has(g.id));

  if (images.length === 0) return null;

  return (
    <div className="relative">
      {/* Kicker rail */}
      {(spread.kicker || spread.title) && (
        <header className="mb-8 grid grid-cols-12 items-baseline gap-4">
          <span className="col-span-12 tracking-meta text-[var(--ink)]/55 sm:col-span-3">
            {spread.kicker}
          </span>
          {spread.title && (
            <h3 className="col-span-12 font-display text-3xl italic text-[var(--ink-soft)] sm:col-span-9 sm:text-4xl">
              — {spread.title}
            </h3>
          )}
        </header>
      )}

      {/* Layout per kind */}
      {spread.kind === "solo" && <Solo image={images[0]} index={index} />}
      {spread.kind === "duo" && (
        <Duo images={images} offsets={spread.offsets} index={index} />
      )}
      {spread.kind === "trio" && (
        <Trio images={images} offsets={spread.offsets} index={index} />
      )}
      {spread.kind === "quad" && <Quad images={images} index={index} />}
    </div>
  );
}

/* ----------------------- layouts ----------------------- */

function Solo({ image, index }: { image: GalleryImage; index: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={image.id}
        className="grid grid-cols-12 gap-4 sm:gap-6"
        layout
      >
        <Frame image={image} className="col-span-12 sm:col-span-10 sm:col-start-2" parallax={-4} index={index} />
      </motion.div>
    </AnimatePresence>
  );
}

function Duo({
  images,
  offsets = [0, 0],
  index,
}: {
  images: GalleryImage[];
  offsets?: number[];
  index: number;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-8">
      {images.map((img, i) => (
        <Frame
          key={img.id}
          image={img}
          className={`col-span-12 sm:col-span-6 ${i === 0 ? "sm:col-start-1" : "sm:col-start-7"}`}
          offsetY={offsets[i] ?? 0}
          parallax={i % 2 === 0 ? -5 : 5}
          index={index + i}
        />
      ))}
    </div>
  );
}

function Trio({
  images,
  offsets = [0, 0, 0],
  index,
}: {
  images: GalleryImage[];
  offsets?: number[];
  index: number;
}) {
  // Magazine spread: bigger main + 2 secondary, staggered vertically
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-6">
      {/* Main */}
      <Frame
        image={images[0]}
        className="col-span-12 sm:col-span-7 sm:col-start-1"
        offsetY={offsets[0] ?? 0}
        parallax={-6}
        index={index}
      />
      {/* Second */}
      {images[1] && (
        <Frame
          image={images[1]}
          className="col-span-7 sm:col-span-4 sm:col-start-9"
          offsetY={offsets[1] ?? 0}
          parallax={8}
          index={index + 1}
        />
      )}
      {/* Third — smaller, offset */}
      {images[2] && (
        <Frame
          image={images[2]}
          className="col-span-5 col-start-1 sm:col-span-3 sm:col-start-9 sm:mt-8"
          offsetY={offsets[2] ?? 0}
          parallax={-3}
          index={index + 2}
        />
      )}
    </div>
  );
}

function Quad({ images, index }: { images: GalleryImage[]; index: number }) {
  // Contact sheet — 4 quasi-square polaroids in a tidy grid
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
      {images.map((img, i) => (
        <Frame
          key={img.id}
          image={img}
          className="col-span-1"
          parallax={i % 2 === 0 ? -3 : 3}
          index={index + i}
        />
      ))}
    </div>
  );
}

/* ----------------------- frame ----------------------- */

function Frame({
  image,
  className,
  offsetY = 0,
  parallax = 0,
  index,
}: {
  image: GalleryImage;
  className: string;
  offsetY?: number;
  parallax?: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallax * -1}%`, `${parallax}%`],
  );

  return (
    <motion.figure
      ref={ref}
      layout
      className={`group relative ${className}`}
      style={{
        aspectRatio: image.ratio,
        marginTop: offsetY ? `${offsetY}%` : undefined,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.05,
      }}
      data-cursor="hover"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 overflow-hidden bg-[var(--paper-soft)]"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1500px) 50vw, 750px"
          className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.035]"
          style={{ objectPosition: image.position ?? "center" }}
          priority={image.priority}
        />
        {/* Subtle bottom gradient on hover for caption legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--ink)]/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Hover caption inside the frame */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-[var(--paper)] opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="tracking-meta">{image.label}</span>
          <span className="tracking-meta text-[var(--paper)]/80">
            {image.category}
          </span>
        </div>
      </motion.div>

      {/* Caption below the frame — magazine style */}
      <figcaption className="absolute -bottom-7 left-0 right-0 flex items-baseline justify-between text-[var(--ink)]/65">
        <span className="tracking-meta">
          <span className="font-mono mr-2">
            {String(index + 1).padStart(2, "0")}
          </span>
          {image.caption}
        </span>
        <span className="tracking-meta text-[var(--ink)]/40">
          {(image.ratio).toFixed(2)}
        </span>
      </figcaption>
    </motion.figure>
  );
}
