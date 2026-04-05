/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/rasikhacademy/dr.fathiabdelaziz',
        destination: '/dr.fathiabdelaziz',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 