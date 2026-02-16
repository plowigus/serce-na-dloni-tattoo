/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. WYŁĄCZAMY MAPY ŹRÓDEŁ - to one ważyły 2MB+
  productionBrowserSourceMaps: false,

  // 2. Transpilacja dla Three.js (zostawiamy, bo potrzebne)
  transpilePackages: ['three', '@react-three/fiber', '@react-three/rapier'],

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sercenadlonistudio.pl',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            // Zostawiamy bezpieczne nagłówki
            value: "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;",
          }
        ],
      },
    ];
  },
};

export default nextConfig;