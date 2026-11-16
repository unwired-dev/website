import type { Metadata } from 'next';

import { ProductPageShell } from '@/components/product-page-shell';

export const metadata: Metadata = {
  title: 'Unwired Mail',
  description:
    'Unwired Mail is a coming soon email app with privacy-first defaults and on-device AI for personal communication.',
};

export default function UnwiredMailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductPageShell
      description="A privacy-first email app shaped around personal communication and on-device AI."
      index="01"
      kind="mail"
      title="Unwired Mail">
      {children}
    </ProductPageShell>
  );
}
