/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    // Use Turbopack for faster development
    turbo: {
      resolveAlias: {
        '@/domain': './src/domain',
        '@/infrastructure': './src/infrastructure',
        '@/components': './src/presentation/components',
        '@/hooks': './src/presentation/hooks',
        '@/stores': './src/presentation/stores',
        '@/types': './src/shared/types',
        '@/utils': './src/shared/utils',
        '@/constants': './src/shared/constants',
        '@/config': './src/shared/config',
      },
    },
  },

  // Image optimization
  images: {
    domains: [
      'localhost',
      'your-api-domain.com',
      'images.unsplash.com', // for demo images
    ],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};