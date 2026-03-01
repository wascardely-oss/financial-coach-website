/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Deshabilitar prerendering estático para evitar errores de contexto
  experimental: {
    isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig;
