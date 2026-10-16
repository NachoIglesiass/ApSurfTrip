import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hay otro package-lock.json en una carpeta superior: fijamos la raíz del proyecto.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
