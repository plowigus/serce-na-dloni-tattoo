/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // TO NAPRAWIA OSTRZEŻENIE LIGHTHOUSE:
  productionBrowserSourceMaps: true,

  images: {
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
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Poprawiony CSP (opcjonalnie, jeśli poprzedni był zbyt restrykcyjny)
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;",
          }
        ],
      },
    ];
  },
};

export default nextConfig;