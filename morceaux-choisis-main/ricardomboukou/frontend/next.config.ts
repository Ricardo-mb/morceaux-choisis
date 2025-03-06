/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // This is the most important change:
        pathname: '/**', // Allow any path after the hostname
      },
    ],
    domains: ['res.cloudinary.com'],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;