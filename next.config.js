const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/ACME-store/' : '',
  basePath: isProd ? '/ACME-store' : '',
  trailingSlash: true,
  images: {
    loader: 'imgix',
    path: '',
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.plugins.push(
        new ESLintPlugin({
          extensions: ['js', 'jsx', 'ts', 'tsx'],
          emitWarning: true,
          failOnError: false,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
