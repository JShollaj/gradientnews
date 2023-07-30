const config = require("./src/config/config.json");
const Critters = require('critters-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: 'standalone',
  images: {
    domains: ['dzslhiqiy3lnx.cloudfront.net'],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(new Critters({ preload: 'swap' }));

      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              unused: true,
              dead_code: true,
            },
          },
        }),
      ];
    }

    return config;
  },
};

module.exports = nextConfig;
