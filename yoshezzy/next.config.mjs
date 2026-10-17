/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  // No ESLint config ships with the project, so don't let a missing linter block Vercel builds.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
