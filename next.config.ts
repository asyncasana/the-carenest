import type { NextConfig } from "next";

// Bundle analyzer configuration
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
    // Optimize image loading for LCP
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // SWC minification is enabled by default in production

  // Enable compression
  compress: true,

  // Optimize production builds
  experimental: {
    // Removed optimizeCss due to critters dependency issue
  },

  // Performance headers for caching and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // BFCache optimization - allow back/forward cache
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.svg$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache JS/CSS chunks
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    // Fix for Sanity Studio vendor chunk issues with Next.js 15
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Production optimizations
    if (!dev && !isServer) {
      // Tree-shaking optimizations
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            // Separate Sanity/Studio chunks (lazy loaded)
            sanity: {
              test: /[\\/]node_modules[\\/](@sanity|sanity|next-sanity)[\\/]/,
              name: "sanity",
              chunks: "async",
              priority: 30,
            },
            // Separate map/leaflet chunks (lazy loaded)
            maps: {
              test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
              name: "maps",
              chunks: "async",
              priority: 20,
            },
            // Core React/Next.js chunks (only essential)
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "framework",
              chunks: "all",
              priority: 40,
              enforce: true,
            },
            // Shared libraries
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: "lib",
              chunks: "async",
              priority: 10,
              minChunks: 2,
            },
          },
        },
      };
    }

    return config;
  },

  // External packages for server components (Next.js 15 syntax)
  serverExternalPackages: ["@sanity/client"],

  // Bundle analyzer configuration
  env: {
    ANALYZE: process.env.ANALYZE,
  },
};

export default withBundleAnalyzer(nextConfig);
