import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "127.0.0.1:3000",
        "192.168.0.176:3000",
        // Adicione outros domínios de desenvolvimento aqui, se necessário
        // "example.com",
      ],
    },
  },
  /* config options here */
};

export default nextConfig;

