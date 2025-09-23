import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for Sanity Studio vendor chunk issues with Next.js 15
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // External packages for server components (Next.js 15 syntax)
  serverExternalPackages: ["@sanity/client"],
};

export default nextConfig;
