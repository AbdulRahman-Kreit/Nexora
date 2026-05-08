import type { NextConfig } from "next";

const nextConfig = {
  reactCompiler: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
} as any;

export default nextConfig;