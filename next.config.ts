import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow high-quality variants — default is 75
    qualities: [75, 90, 95, 100],
    // Serve AVIF first (better compression at same quality), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Widths next/image can generate. Bumped so portraits stay crisp on 4K.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 768],
  },
};

export default nextConfig;
