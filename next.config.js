/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-helmet": require("path").resolve(
        __dirname,
        "src/shims/react-helmet.js"
      ),
    };
    return config;
  },
};

module.exports = nextConfig;
