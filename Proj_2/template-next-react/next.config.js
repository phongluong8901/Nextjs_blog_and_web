/** @type {import('next').NextJSConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Bỏ qua lỗi ESLint trong quá trình build trên Vercel
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig