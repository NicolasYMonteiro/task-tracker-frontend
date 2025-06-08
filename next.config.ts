import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@features": path.resolve(__dirname, "src/features"),
      "@auth": path.resolve(__dirname, "src/features/auth"),
      "@types": path.resolve(__dirname, "src/types"),
      "@lib": path.resolve(__dirname, "src/lib"),

    };
    return config;
  },
};

export default nextConfig;
