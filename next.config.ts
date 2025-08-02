import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "/api/proxy/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NODE_ENV === "production"
              ? "https://seusite.com"
              : "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
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