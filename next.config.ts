import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://formerlyincarcerated.org",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
