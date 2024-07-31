const ESLintPlugin = require('eslint-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/ACME-store",
  assetPrefix: "/ACME-store/",
  images: {
    loader: 'akamai',
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
