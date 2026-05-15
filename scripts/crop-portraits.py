"""
Extract clean portraits from the Zerzour Juba press-kit plates.

Each plate is a 1920x1080 spread containing one or more photos with
captions / type set in. We crop the actual photo regions, save them as
optimised JPEGs into public/photos/clean/.

Coordinates were measured visually on the 1920x1080 source files.
"""
from __future__ import annotations

from pathlib import Path
from PIL import Image

SRC = Path("public/photos")
OUT = Path("public/photos/clean")
OUT.mkdir(parents=True, exist_ok=True)

# Full coords table — measured via variance/whiteness scans + visual checks.
# 13 individual photos extracted from 6 press-kit plates.
# Format: (source_file, output_name, (left, top, right, bottom))
CROPS = [
    # ---------- Plate 1 — cover (1 photo) ----------
    # "ZERZOUR JUBA" title above + caption buttons below.
    # Top pushed to 265 to clear the J descender; bottom 868 stops before buttons.
    ("Zerzour_Juba_-_1.png", "cover.png", (468, 265, 1452, 868)),

    # ---------- Plate 3 — bodyshots (3 photos) ----------
    # Studio plate, no white margins — measured by variance scan.
    # A: full-body on the left, dark jumper, hand on shoulder
    ("Zerzour_Juba_-_3.png", "bodyshot-shoulder.png", (5, 62, 955, 1070)),
    # B: leather jacket, top-right cell (y=34..513, x=1049..1766)
    ("Zerzour_Juba_-_3.png", "bodyshot-leather.png", (1049, 34, 1760, 513)),
    # C: studio frontal pull noir, bottom-right cell
    ("Zerzour_Juba_-_3.png", "bodyshot-studio.png", (1049, 565, 1760, 1042)),

    # ---------- Plate 4 — beauty (1 photo) ----------
    # "BEAUTY SHOT" text on the left, "04" page number bottom-right.
    # Push left to 995 to clear text; right to 1840 to clear page number.
    ("Zerzour_Juba_-_4.png", "beauty.png", (995, 10, 1840, 1050)),

    # ---------- Plate 5 — lifestyle (2 photos) ----------
    # "LIFESTYLE" title top-left, "05" page number bottom-right.
    ("Zerzour_Juba_-_5.png", "lifestyle-corridor.png", (43, 320, 960, 870)),
    ("Zerzour_Juba_-_5.png", "lifestyle-hoodie.png", (1004, 30, 1812, 1075)),

    # ---------- Plate 6 — contact (1 photo) ----------
    # "ZERZOUR JUBA" name + contact on the left, portrait on the right.
    ("Zerzour_Juba_-_6.png", "studio-fulllength.png", (1080, 35, 1780, 1070)),

    # ---------- Plate polaroid — 5 photos (4 grid + 1 large) ----------
    # Grid bounds measured via whiteness scan, all 4 cells clean.
    ("Zerzour_Juba_-_polaroid.png", "polaroid-a.png", (118, 73, 455, 467)),
    ("Zerzour_Juba_-_polaroid.png", "polaroid-b.png", (478, 73, 815, 467)),
    ("Zerzour_Juba_-_polaroid.png", "polaroid-c.png", (118, 491, 455, 886)),
    ("Zerzour_Juba_-_polaroid.png", "polaroid-d.png", (478, 491, 815, 886)),
    # Large hand-on-chin portrait on the right.
    ("Zerzour_Juba_-_polaroid.png", "polaroid-portrait.png", (980, 451, 1798, 1048)),
]


def main() -> None:
    for src, out, box in CROPS:
        srcp = SRC / src
        outp = OUT / out
        with Image.open(srcp) as im:
            cropped = im.crop(box)
            # Lossless PNG at native resolution — next/image will downscale &
            # convert to WebP/AVIF per device on the fly.
            cropped.save(outp, "PNG", optimize=True)
            print(f"  ✓ {out}  {cropped.size}  ({outp.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    print(f"Cropping {len(CROPS)} portraits → {OUT}/")
    main()
    print("Done.")
