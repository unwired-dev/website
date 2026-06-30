import type { Metadata } from 'next';

import { ProductPageShell } from '@/components/product-page-shell';

export const metadata: Metadata = {
  title: 'Unwired Calendar',
  description:
    'Unwired Calendar is a coming soon calendar app with on-device AI for remembering what matters.',
};

export default function UnwiredCalendarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductPageShell
      description="A calendar app centered on on-device AI for keeping commitments and context close."
      index="02"
      kind="calendar"
      title="Unwired Calendar">
      {children}
    </ProductPageShell>
  );
}
