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
    'Unwired builds on-device AI products and helps teams ship better frontends.',
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
                href="/#products">
                Products
              </Link>
              <Link
                className={cn(buttonVariants({ variant: 'ghost' }))}
                href="/#services">
                Services
              </Link>
              <Link
                className={cn(buttonVariants({ variant: 'ghost' }))}
                href="/#about">
                About
              </Link>
            </nav>
          </header>
          <AppTRPCProvider>{children}</AppTRPCProvider>
          <footer className="text-muted-foreground mx-auto mt-20 grid w-full max-w-6xl gap-8 border-t px-6 py-8 text-sm sm:px-10 lg:grid-cols-[1fr_auto] lg:px-12">
            <div className="flex flex-col gap-4">
              <p>
                Unwired builds on-device AI products and helps teams ship better
                frontends.
              </p>
              <nav className="flex flex-wrap gap-x-4 gap-y-2">
                <Link href="/#products">Products</Link>
                <Link href="/#services">Services</Link>
                <Link href="/#about">About</Link>
                <Link href="/products/waitlist">Product waitlist</Link>
                <a
                  href="https://www.linkedin.com/in/jan-%C5%A1ilhan/"
                  rel="noreferrer"
                  target="_blank">
                  LinkedIn
                </a>
                <a href="mailto:silhan@unwired.dev">Email</a>
              </nav>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <p>Need senior frontend help?</p>
              <a
                className={cn(buttonVariants({ variant: 'outline' }))}
                href="mailto:silhan@unwired.dev">
                Email silhan@unwired.dev
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
