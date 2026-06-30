declare module '*.mdx' {
  import type { ComponentType } from 'react';

  import type { WritingMetadata } from '@/content/writing';

  export const metadata: WritingMetadata;

  const MDXContent: ComponentType;

  export default MDXContent;
}
