import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/a-propos",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
