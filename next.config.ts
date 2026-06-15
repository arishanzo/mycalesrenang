import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // sesuaikan dengan port API kamu
        pathname: '/api/transkasi/buktitf/**',
      },
    ],
  },
};

export default nextConfig;
