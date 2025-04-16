import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.pinimg.com',
      'localhost',
      'yourdomain.com',
      'cdn.yourdomain.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/474x/**',
      },
      {
        protocol: 'https',
        hostname: '**.yourdomain.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },

  // Modern Next.js defaults (no need to specify these explicitly)
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,

  // Updated experimental features for Next.js 13/14
  experimental: {
    typedRoutes: false, // Disable if using Turbopack
    serverActions: {
      enabled: true,
    },
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
    ],
  },

  // Webpack configuration (remove if using Turbopack)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

// Conditionally apply Turbopack-specific config
if (process.env.TURBOPACK) {
  delete nextConfig.webpack;
  nextConfig.experimental.typedRoutes = false;
}

export default nextConfig;