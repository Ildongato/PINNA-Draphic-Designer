import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/PINNA-Draphic-Designer";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: isGithubPages ? "export" : undefined,
  trailingSlash: isGithubPages,
  basePath: isGithubPages ? githubPagesBasePath : undefined,
  assetPrefix: isGithubPages ? githubPagesBasePath : undefined,
  images: {
    unoptimized: isGithubPages,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
