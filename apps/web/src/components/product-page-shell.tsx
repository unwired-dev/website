import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import { ArrowUpRight, ProductVisual } from '@/components/product-visual';

interface ProductPageShellProps {
  readonly children: React.ReactNode;
  readonly description: string;
  readonly index: string;
  readonly kind: 'calendar' | 'mail';
  readonly title: string;
}

export function ProductPageShell({
  children,
  description,
  index,
  kind,
  title,
}: ProductPageShellProps) {
  return (
    <main
      className="site-main"
      id="main-content">
      <section className="product-hero page-grid reveal">
        <div className="product-hero__copy">
          <p className="eyebrow">
            <span>{index}</span>
            Unwired product
          </p>
          <h1 className="display-title display-title--product">{title}</h1>
          <p className="product-hero__lead">{description}</p>
          <Link
            className={cn(buttonVariants({ size: 'lg' }), 'cta-button')}
            href="/products/waitlist">
            Join the product waitlist
            <ArrowUpRight />
          </Link>
        </div>
        <ProductVisual
          className="product-hero__visual"
          kind={kind}
        />
      </section>

      <section className="product-story page-grid reveal reveal--delay">
        <aside
          className="product-story__rail"
          aria-label="Product summary">
          <p>Coming soon</p>
          <p>macOS · iOS · iPadOS</p>
          <p>On-device AI</p>
        </aside>
        <article className="prose-editorial">{children}</article>
      </section>

      <section className="product-closing page-grid reveal">
        <p className="eyebrow">
          <span>{index}</span>
          Follow the work
        </p>
        <div className="product-closing__body">
          <h2>Interested in where this is going?</h2>
          <p>
            Join one shared list for Unwired Mail and Unwired Calendar updates.
            Choose the products and Apple platforms you care about.
          </p>
          <Link
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'cta-button',
            )}
            href="/products/waitlist">
            Join the product waitlist
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
