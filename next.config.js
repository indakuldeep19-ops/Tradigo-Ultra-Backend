/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

  experimental: {
    optimizeCss: false,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
