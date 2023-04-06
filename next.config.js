/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config({path: `${process.cwd()}/env/${process.env.NODE_ENV}.env`});

const nextConfig = {
  reactStrictMode: true,
  env: {
    baseUrl: process.env.BASE_URL
  }

}

module.exports = nextConfig
