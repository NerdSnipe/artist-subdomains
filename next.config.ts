import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      afterFiles: [
        {
          // Exclude /preview and /api so their own (dynamic) routes can resolve
          // normally instead of being swallowed by the domain catch-all below.
          source: "/:path((?!preview|api).*)",
          has: [{ type: "host", value: "(?<domain>.+)" }],
          destination: "/:domain/:path",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        // Exclude /_next/image and /_next/static so the optimized-image CDN
        // cache (and JS/CSS asset cache) isn't defeated by the no-store rule
        // below — only page/API responses need to always be fresh.
        source: "/:path((?!_next/).*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
  images: {
    // Optimized images rarely change (new artwork = new S3 key, and saves
    // are cache-busted via /api/revalidate), so let Vercel's CDN cache
    // transformed variants for a month instead of re-optimizing on every hit.
    minimumCacheTTL: 2592000,
    deviceSizes: [420, 640, 768, 1024, 1280, 1920],
    imageSizes: [64, 96, 128, 160, 200, 256, 384, 480],
    remotePatterns: [
      { protocol: "https", hostname: "**.s3.*.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.railway.app" },
      { protocol: "https", hostname: "www.artsdistrictusa.com" },
      { protocol: "https", hostname: "api.artdistrictusa.com" },
    ],
  },
};

export default nextConfig;
