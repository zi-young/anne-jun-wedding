import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [480, 750, 1080],
    imageSizes: [160, 320, 480],
  },
};

export default nextConfig;
