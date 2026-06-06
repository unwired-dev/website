import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-ink)]">
        <div className="relative isolate flex min-h-full flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#e0f2fe_0,rgba(224,242,254,0.65)_18%,rgba(248,250,252,0)_46%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]" />
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-10 lg:px-12">
            <Link
              href="/"
              className="text-lg font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
              Unwired
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-[var(--color-muted)]">
              <Link href="/">Home</Link>
              <Link href="/unwired-mail">Unwired Mail</Link>
              <a href="mailto:hello@unwired.dev">Contact</a>
            </nav>
          </header>
          {children}
          <footer className="mx-auto mt-20 flex w-full max-w-6xl flex-col gap-3 border-t border-[var(--color-line)] px-6 py-8 text-sm text-[var(--color-muted)] sm:px-10 lg:px-12">
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
