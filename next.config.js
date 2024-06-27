/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  experimental: {
    runtime: 'nodejs',
  },
}

module.exports = nextConfig
