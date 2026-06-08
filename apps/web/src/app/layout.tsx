import type { Metadata } from 'next';

import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import { AppTRPCProvider } from '@/components/trpc-provider';

import '@unwired/ui/globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Unwired',
  description:
    'Founder-led React consultancy for product teams that need senior hands-on frontend leadership.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        'h-full antialiased',
      )}>
      <body className="bg-background text-foreground min-h-full">
        <div className="relative isolate flex min-h-full flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#e0f2fe_0,rgba(224,242,254,0.65)_18%,rgba(248,250,252,0)_46%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]" />
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-10 lg:px-12">
            <Link
              className="text-lg font-semibold tracking-[-0.04em]"
              href="/">
              Unwired
            </Link>
            <nav className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <Link
                className={cn(buttonVariants({ variant: 'ghost' }))}
                href="/">
                Home
              </Link>
              <Link
                className={cn(buttonVariants({ variant: 'ghost' }))}
                href="/unwired-mail">
                Unwired Mail
              </Link>
              <a
                className={cn(buttonVariants({ variant: 'ghost' }))}
                href="mailto:hello@unwired.dev">
                Contact
              </a>
            </nav>
          </header>
          <AppTRPCProvider>{children}</AppTRPCProvider>
          <footer className="text-muted-foreground mx-auto mt-20 flex w-full max-w-6xl flex-col gap-3 border-t px-6 py-8 text-sm sm:px-10 lg:px-12">
            <p>
              Unwired is a founder-led React consultancy under the Unwired
              brand.
            </p>
            <p>
              Privacy-focused product work, frontend architecture, and senior
              implementation.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
