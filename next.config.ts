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
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
  images: {
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
