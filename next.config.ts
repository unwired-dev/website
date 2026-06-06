import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
