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
  async rewrites() {
    return [
      {
        source: "/user/:path*",
        destination: "https://task-tracker-backend-glwz.onrender.com/user/:path*",
      },
      {
        source: "/task/:path*",
        destination: "https://task-tracker-backend-glwz.onrender.com/task/:path*",
      },
    ];
  },
};
export default nextConfig;
