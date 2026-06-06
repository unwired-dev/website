import path from 'node:path';

import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@unwired/ui'],
  turbopack: {
    root: path.join(import.meta.dirname, '../..'),
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
