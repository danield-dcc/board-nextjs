import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
