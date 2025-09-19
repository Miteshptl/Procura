module.exports = {
  reactStrictMode: true,
  env: {
    API_GATEWAY_URL: process.env.API_GATEWAY_URL || 'http://localhost:3000',
  },
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domain
  },
};