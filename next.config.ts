import type { NextConfig } from "next";

const repo = "my-portfolio";

const nextConfig: NextConfig = {
  output: "export",

  // GitHub Pages cannot run the Next.js image optimizer
  images: {
    unoptimized: true,
  },

  // Required for GitHub Pages project sites
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;
