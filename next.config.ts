import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/:path*",
          has: [{ type: "host", value: "(?<domain>.+)" }],
          destination: "/:domain/:path*",
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
      { protocol: "https", hostname: "www.artdistrictusa.com" },
      { protocol: "https", hostname: "api.artdistrictusa.com" },
    ],
  },
};

export default nextConfig;
