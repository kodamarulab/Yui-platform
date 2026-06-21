// Next.js configuration for static export.
// next.config.ts
import type { NextConfig } from "next";

const repositoryBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: repositoryBasePath,
  assetPrefix: repositoryBasePath || undefined,
};

export default nextConfig;
