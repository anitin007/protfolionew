import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Suppress trailing slash issues on static hosts
  trailingSlash: true,
};

export default nextConfig;
