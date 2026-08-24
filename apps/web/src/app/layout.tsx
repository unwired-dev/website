import type { Metadata, Viewport } from 'next';

import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import { Atkinson_Hyperlegible_Next, Familjen_Grotesk } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';

import { BookingPrivacyNote } from '@/components/booking-privacy-note';
import { ctaButton, pageGrid } from '@/components/marketing-styles';
import { ArrowUpRight } from '@/components/product-visual';
import { ThemeToggle } from '@/components/theme-toggle';
import { AppTRPCProvider } from '@/components/trpc-provider';
import { bookingUrl, siteUrl } from '@/lib/site';

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

const wordmark =
  'inline-flex min-h-11 items-center gap-[0.55rem] font-heading text-[1.15rem] font-[650] tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
          className="bg-primary text-primary-foreground fixed top-4 left-4 z-[100] -translate-y-[200%] px-4 py-3 transition-transform duration-[160ms] ease-[var(--ease-out-quart)] focus:translate-y-0"
          href="#main-content">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <header className="relative z-20 mx-auto flex min-h-18 w-[min(calc(100%_-_2rem),90rem)] items-center justify-between gap-4 border-b border-[color-mix(in_oklch,var(--border),transparent_35%)] sm:min-h-20 md:w-[min(calc(100%_-_4rem),90rem)]">
            <Link
              aria-label="Unwired home"
              className={wordmark}
              href="/">
              <span className="size-[0.45rem] rounded-full bg-[var(--signal)]" />
              unwired
            </Link>
            <div className="flex items-center gap-2">
              <nav
                aria-label="Primary navigation"
                className="[&>a]:text-muted-foreground [&>a:hover]:text-foreground [&>a:focus-visible]:text-foreground [&>a:focus-visible]:outline-ring flex items-center gap-1 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:px-2 [&>a]:text-[0.78rem] [&>a]:font-[550] [&>a]:transition-colors [&>a]:duration-[160ms] [&>a]:ease-[var(--ease-out-quart)] sm:[&>a]:px-3 sm:[&>a]:text-sm [&>a:focus-visible]:outline-2 [&>a:focus-visible]:outline-offset-3 max-[359px]:[&>a:last-child]:hidden">
                <Link href="/#products">Products</Link>
                <Link href="/#services">Services</Link>
                <Link href="/#about">About</Link>
              </nav>
              <ThemeToggle />
            </div>
          </header>

          <AppTRPCProvider>{children}</AppTRPCProvider>

          <footer
            className={cn(
              pageGrid,
              'gap-y-14 border-t border-border pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-3 [&_a:focus-visible]:outline-ring',
            )}>
            <div className="col-span-full flex flex-col items-start gap-4 md:col-start-1 md:col-end-7">
              <Link
                aria-label="Unwired home"
                className={wordmark}
                href="/">
                <span className="size-[0.45rem] rounded-full bg-[var(--signal)]" />
                unwired
              </Link>
              <p className="text-muted-foreground max-w-md leading-[1.6]">
                On-device AI products and senior frontend consultancy, built by
                Jan Šilhan.
              </p>
            </div>
            <nav
              aria-label="Footer navigation"
              className="[&>a]:text-muted-foreground [&>a:hover]:text-foreground col-start-1 col-end-3 flex flex-col items-start gap-4 md:col-start-7 md:col-end-9 [&>a]:underline [&>a]:decoration-transparent [&>a]:underline-offset-[0.25em] [&>a]:transition-[color,text-decoration-color] [&>a]:duration-[160ms] [&>a]:ease-[var(--ease-out-quart)] [&>a:hover]:decoration-[var(--signal)]">
              <p className="text-xs font-[650] tracking-[0.14em] text-[var(--signal)] uppercase">
                Explore
              </p>
              <Link href="/#products">Products</Link>
              <Link href="/#services">Services</Link>
              <Link href="/products/waitlist">Product waitlist</Link>
            </nav>
            <div className="col-span-full flex flex-col items-start gap-4 md:col-start-9 md:col-end-13">
              <p className="text-muted-foreground max-w-md leading-[1.6]">
                Have a frontend problem worth solving?
              </p>
              <a
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  ctaButton,
                )}
                href={bookingUrl}
                rel="noreferrer"
                target="_blank">
                Book a frontend consultation
                <ArrowUpRight />
              </a>
              <a
                className="text-muted-foreground hover:text-foreground underline decoration-transparent underline-offset-[0.25em] transition-[color,text-decoration-color] duration-[160ms] ease-[var(--ease-out-quart)] hover:decoration-[var(--signal)]"
                href="mailto:silhan@unwired.dev">
                silhan@unwired.dev
              </a>
              <BookingPrivacyNote />
            </div>
            <div className="border-border text-muted-foreground col-span-full grid gap-8 border-t pt-6 text-xs leading-[1.7] md:grid-cols-12">
              <address className="grid gap-1 not-italic md:col-start-1 md:col-end-9">
                <p className="text-foreground font-[650]">Unwired, s.r.o.</p>
                <p>Soběšická 184/36, Husovice, 614 00 Brno, Czech Republic</p>
                <p className="flex flex-wrap gap-x-3">
                  <span>IČO 19711131</span>
                  <span aria-hidden="true">·</span>
                  <span>DIČ CZ19711131</span>
                </p>
                <p className="max-w-2xl">
                  Registered in the Commercial Register maintained by the
                  Regional Court in Brno, section C, file 135646.
                </p>
              </address>
              <div className="flex flex-col items-start gap-3 md:col-start-10 md:col-end-13">
                <Link
                  className="text-foreground underline decoration-[var(--signal)] underline-offset-[0.24em] transition-colors duration-[160ms] ease-[var(--ease-out-quart)] hover:text-[var(--signal)]"
                  href="/privacy">
                  Privacy Notice
                </Link>
                <Link
                  className="text-foreground underline decoration-[var(--signal)] underline-offset-[0.24em] transition-colors duration-[160ms] ease-[var(--ease-out-quart)] hover:text-[var(--signal)]"
                  href="/terms">
                  Terms of Use
                </Link>
                <p>© {new Date().getFullYear()} Unwired, s.r.o.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
