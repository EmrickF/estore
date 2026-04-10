import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.shop.programutvecklare.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shop.programutvecklare.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
