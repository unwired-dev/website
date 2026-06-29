import type { Metadata, Viewport } from 'next';

import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import { Atkinson_Hyperlegible_Next, Familjen_Grotesk } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';

import { ArrowUpRight } from '@/components/product-visual';
import { ThemeToggle } from '@/components/theme-toggle';
import { AppTRPCProvider } from '@/components/trpc-provider';

import '@unwired/ui/globals.css';

const displayFont = Familjen_Grotesk({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
});

const bodyFont = Atkinson_Hyperlegible_Next({
  adjustFontFallback: false,
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
});

const themeScript = `
  try {
    const saved = localStorage.getItem('unwired-theme');
    const theme = saved === 'dark' || saved === 'light'
      ? saved
      : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.add(theme);
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.classList.add('dark');
    document.documentElement.dataset.theme = 'dark';
  }
`;

export const metadata: Metadata = {
  title: {
    default: 'Unwired',
    template: '%s | Unwired',
  },
  description:
    'Unwired builds on-device AI products and helps teams ship better frontends.',
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(displayFont.variable, bodyFont.variable)}>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a
          className="skip-link"
          href="#main-content">
          Skip to main content
        </a>
        <div className="site-frame">
          <header className="site-header">
            <Link
              aria-label="Unwired home"
              className="wordmark"
              href="/">
              <span className="wordmark__signal" />
              unwired
            </Link>
            <div className="site-header__actions">
              <nav
                aria-label="Primary navigation"
                className="site-nav">
                <Link href="/#products">Products</Link>
                <Link href="/#services">Services</Link>
                <Link href="/#about">About</Link>
              </nav>
              <ThemeToggle />
            </div>
          </header>

          <AppTRPCProvider>{children}</AppTRPCProvider>

          <footer className="site-footer page-grid">
            <div className="site-footer__brand">
              <Link
                aria-label="Unwired home"
                className="wordmark"
                href="/">
                <span className="wordmark__signal" />
                unwired
              </Link>
              <p>
                On-device AI products and senior frontend consultancy, built by
                Jan Šilhan.
              </p>
            </div>
            <nav
              aria-label="Footer navigation"
              className="site-footer__nav">
              <p>Explore</p>
              <Link href="/#products">Products</Link>
              <Link href="/#services">Services</Link>
              <Link href="/products/waitlist">Product waitlist</Link>
            </nav>
            <div className="site-footer__contact">
              <p>Have a frontend problem worth solving?</p>
              <a
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'cta-button',
                )}
                href="https://cal.com/jan-silhan-unwired/frontend-consultation"
                rel="noreferrer"
                target="_blank">
                Book a consultation
                <ArrowUpRight />
              </a>
              <a href="mailto:silhan@unwired.dev">silhan@unwired.dev</a>
            </div>
            <p className="site-footer__fineprint">
              © {new Date().getFullYear()} Unwired
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
