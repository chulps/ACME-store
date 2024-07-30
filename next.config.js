const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/acme-store' : '',
  basePath: isProd ? '/acme-store' : '',
  trailingSlash: true,
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
