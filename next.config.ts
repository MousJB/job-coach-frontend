import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Racine explicite : évite l'avertissement Turbopack quand un lockfile
  // existe aussi dans un dossier parent (ex: C:\Users\jabie\package-lock.json).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
