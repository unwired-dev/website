declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const metadata: {
    title: string;
    summary: string;
    publishedAt: string;
  };

  const MDXContent: ComponentType;

  export default MDXContent;
}
