import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "11j9kbjs2p.ufs.sh",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "media4.giphy.com",
        pathname: "/media/**",
      },
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*.mdx",
        destination: "/llms.mdx/docs/:path*",
      },
    ];
  },
};

export default withMDX(config);
