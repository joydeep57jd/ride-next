import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  assetPrefix: "",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },

  images: {
    path: "/_next/image",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "maps.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "metrodtw.wizardcomm.in",
        pathname: "**",
      },
    ],
    disableStaticImages: false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
