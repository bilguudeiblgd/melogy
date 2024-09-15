/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com'
      }
    ]
  },
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Prevent site from being loaded in iframes
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer', // Remove referrer information
          },
        ],
      },
    ];
  },

};

export default nextConfig;
