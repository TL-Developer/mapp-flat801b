import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // If you paste Airbnb (or other) remote image URLs into the listing data,
    // Next/Image needs the domain allowed here.
    remotePatterns: [
      { protocol: "https", hostname: "a0.muscache.com" },
      { protocol: "https", hostname: "airbnb.com" },
      { protocol: "https", hostname: "airbnb.com.br" },
    ],
  },
};

export default nextConfig;
