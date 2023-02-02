/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['flagcdn.com'],
  },
  env: {
    MAIN_URL: process.env.MAIN_URL,
    MAIN_KEY: process.env.MAIN_KEY,
    RAPID_URL: process.env.RAPID_URL,
    RAPID_KEY: process.env.RAPID_KEY,
  }
};

module.exports = nextConfig;
