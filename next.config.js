/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
  },
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: false,
  images: {
    domains: ["prod-metadata.s3.amazonaws.com", "ethereum.org"],
  },
};
