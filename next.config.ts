import type { NextConfig } from "next";
import path from "path";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
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
  async rewrites() {
    return [
      {
        source: "/user/:path*",
        destination: "http://localhost:8000/user/:path*",
      },
      {
        source: "/task/:path*",
        destination: "http://localhost:8000/task/:path*",
      },
    ];
  },
};

export default nextConfig;
