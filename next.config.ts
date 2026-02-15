/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Wyłączamy dla Three.js

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sercenadlonistudio.pl',
      },
    ],
  },

  // OPTYMALIZACJA: Nagłówki bezpieczeństwa (Security Headers)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Chroni przed clickjackingiem
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Chroni przed błędną interpretacją typów MIME
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Bezpieczeństwo odnośników
          },
        ],
      },
    ];
  },
};

export default nextConfig;