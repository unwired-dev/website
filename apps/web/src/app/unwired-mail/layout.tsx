import type { Metadata } from 'next';

import { Card, CardContent } from '@unwired/ui/components/card';

export const metadata: Metadata = {
  title: 'Unwired Mail | Unwired',
  description:
    'Unwired Mail is a coming soon email app with privacy-first defaults and on-device AI for personal communication.',
};

export default function UnwiredMailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:px-10">
      <Card className="shadow-lg">
        <CardContent className="pt-(--card-spacing) sm:px-12 sm:py-12">
          {children}
        </CardContent>
      </Card>
    </main>
  );
}
