import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // 关掉右下角的开发指示器，避免遮挡界面
  devIndicators: false,
};

export default config;
