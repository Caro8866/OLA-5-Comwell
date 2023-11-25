/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dwarf.dk",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
