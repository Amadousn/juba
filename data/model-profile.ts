/**
 * Centralised model data. Edit any field here and the entire site updates.
 * Extracted from the official press kit (Zerzour Juba — Open Call sheet).
 */

export type GalleryCategory =
  | "polaroid"
  | "bodyshot"
  | "beauty"
  | "lifestyle"
  | "editorial";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  label: string;
  category: GalleryCategory;
  /** Native aspect ratio (width / height) */
  ratio: number;
  /** object-position fine-tuning */
  position?: string;
  priority?: boolean;
};

export const model = {
  firstName: "Juba",
  lastName: "Zerzour",
  fullName: "Zerzour Juba",
  tagline: "Soft masculinity, cinematic presence.",
  manifesto:
    "French model blending soft masculinity with a cinematic, urban aesthetic. Drawn to runway, streetwear and contemporary fashion campaigns — influenced by European editorials and understated luxury.",
  bioShort:
    "French model. Available for editorial, runway and commercial collaborations across Paris, Milan and London.",
  bioLong:
    "Juba Zerzour is a French model whose work sits between European editorial restraint and contemporary streetwear energy. His presence reads as composed and quietly intense — a softness that holds the frame without overstating it. He moves comfortably between runway, beauty, editorial and commercial briefs, with a particular pull toward narrative campaigns and understated luxury.",

  location: {
    base: "Paris",
    cities: ["Paris", "Milan", "London"],
    country: "France",
  },

  measurements: {
    height: { value: 184, unit: "cm" },
    bust: { value: 97, unit: "cm" },
    waist: { value: 82, unit: "cm" },
    hips: { value: 106, unit: "cm" },
    shoes: { value: 43, unit: "EU" }, // TODO: confirm
    hair: "Dark brown",
    eyes: "Brown",
  },

  categories: [
    "Runway",
    "Editorial",
    "Streetwear",
    "Commercial",
    "Beauty",
  ] as const,

  status: {
    representation: "Open call",
    availability: "Available for bookings",
    travels: true,
  },

  contact: {
    email: "jubazpro@gmail.com",
    instagram: "@zerzourjuba",
    instagramUrl: "https://instagram.com/zerzourjuba",
    agency: null as string | null,
  },

} as const;

/**
 * Clean portraits — 13 individual photos extracted from 6 press-kit plates
 * (see scripts/crop-portraits.py). Each ratio is the true pixel ratio of
 * the cropped JPEG, so cadres can size themselves to fit perfectly.
 */
export const gallery: GalleryImage[] = [
  {
    id: "cover",
    src: "/photos/clean/cover.png",
    alt: "Zerzour Juba — over-the-shoulder look, studio",
    caption: "Cover · Studio",
    label: "Cover",
    category: "editorial",
    ratio: 984 / 603,
    position: "50% 35%",
    priority: true,
  },
  {
    id: "beauty",
    src: "/photos/clean/beauty.png",
    alt: "Zerzour Juba — beauty close-up, profile",
    caption: "Beauty",
    label: "Beauty",
    category: "beauty",
    ratio: 845 / 1040,
    position: "50% 30%",
    priority: true,
  },
  {
    id: "polaroid-portrait",
    src: "/photos/clean/polaroid-portrait.png",
    alt: "Zerzour Juba — hand-on-chin portrait, studio",
    caption: "Portrait · Studio",
    label: "Portrait",
    category: "editorial",
    ratio: 818 / 597,
    position: "50% center",
  },
  {
    id: "bodyshot-shoulder",
    src: "/photos/clean/bodyshot-shoulder.png",
    alt: "Zerzour Juba — full body bodyshot, hand on shoulder",
    caption: "Bodyshot · Hand",
    label: "Bodyshot",
    category: "bodyshot",
    ratio: 950 / 1008,
    position: "50% 30%",
  },
  {
    id: "bodyshot-leather",
    src: "/photos/clean/bodyshot-leather.png",
    alt: "Zerzour Juba — leather jacket, looking away",
    caption: "Leather · Backstage",
    label: "Leather",
    category: "bodyshot",
    ratio: 711 / 479,
    position: "30% center",
  },
  {
    id: "bodyshot-studio",
    src: "/photos/clean/bodyshot-studio.png",
    alt: "Zerzour Juba — frontal studio portrait, black jumper",
    caption: "Frontal · Studio",
    label: "Frontal",
    category: "bodyshot",
    ratio: 711 / 477,
    position: "50% 25%",
  },
  {
    id: "lifestyle-corridor",
    src: "/photos/clean/lifestyle-corridor.png",
    alt: "Zerzour Juba — lifestyle, corridor night",
    caption: "Corridor · Paris",
    label: "Corridor",
    category: "lifestyle",
    ratio: 917 / 550,
    position: "70% 40%",
  },
  {
    id: "lifestyle-hoodie",
    src: "/photos/clean/lifestyle-hoodie.png",
    alt: "Zerzour Juba — lifestyle, hoodie, elevator",
    caption: "Hoodie · Elevator",
    label: "Hoodie",
    category: "lifestyle",
    ratio: 808 / 1045,
    position: "50% 25%",
  },
  {
    id: "studio-fulllength",
    src: "/photos/clean/studio-fulllength.png",
    alt: "Zerzour Juba — full-length studio portrait",
    caption: "Full length · Studio",
    label: "Full length",
    category: "bodyshot",
    ratio: 700 / 1035,
    position: "50% 30%",
  },
  {
    id: "polaroid-a",
    src: "/photos/clean/polaroid-a.png",
    alt: "Zerzour Juba — polaroid front",
    caption: "Polaroid · Front",
    label: "Polaroid",
    category: "polaroid",
    ratio: 337 / 394,
    position: "50% 30%",
  },
  {
    id: "polaroid-b",
    src: "/photos/clean/polaroid-b.png",
    alt: "Zerzour Juba — polaroid 3/4",
    caption: "Polaroid · 3/4",
    label: "Polaroid",
    category: "polaroid",
    ratio: 337 / 394,
    position: "50% 30%",
  },
  {
    id: "polaroid-c",
    src: "/photos/clean/polaroid-c.png",
    alt: "Zerzour Juba — polaroid side",
    caption: "Polaroid · Side",
    label: "Polaroid",
    category: "polaroid",
    ratio: 337 / 395,
    position: "50% 30%",
  },
  {
    id: "polaroid-d",
    src: "/photos/clean/polaroid-d.png",
    alt: "Zerzour Juba — polaroid profile",
    caption: "Polaroid · Profile",
    label: "Polaroid",
    category: "polaroid",
    ratio: 337 / 395,
    position: "50% 30%",
  },
];

/** Helper: get an image by id, throws if missing (TS-safe lookup). */
export function img(id: string): GalleryImage {
  const found = gallery.find((g) => g.id === id);
  if (!found) throw new Error(`Image ${id} not found`);
  return found;
}

export const navigation = [
  { label: "Identity", href: "#identity" },
  { label: "Card", href: "#card" },
  { label: "Gallery", href: "#gallery" },
  { label: "Story", href: "#story" },
  { label: "Motion", href: "#motion" },
  { label: "Booking", href: "#booking" },
];
