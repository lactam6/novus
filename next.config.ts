import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 許可するホスト名（ドメイン）のリスト
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google用
      },
      // ... 他のプロバイダー
    ],
  },
};

export default nextConfig;
