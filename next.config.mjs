/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "*", // You can specify a specific hostname or use '*' to allow any hostname
      },
    ],
  },
};

export default nextConfig;
