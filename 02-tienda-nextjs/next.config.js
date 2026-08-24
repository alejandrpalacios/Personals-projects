/** @type {import('next').NextConfig} */
const nextConfig = {
  // Se sirve bajo /lumiere en el dominio unificado del portafolio
  basePath: '/lumiere',
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
