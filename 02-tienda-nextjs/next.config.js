/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Dominios permitidos para imágenes externas — añadir los que uses
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
