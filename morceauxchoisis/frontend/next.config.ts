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
    // Optional: Add domains for even more flexibility (if needed)
    // domains: ['res.cloudinary.com'], // Alternative to remotePatterns
  },
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb'
    },
    // typedRoutes: true,//must be removed if u work using turbopack
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;