import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import {
  ctaButton,
  displayTitle,
  eyebrow,
  pageGrid,
  reveal,
  revealDelay,
} from '@/components/marketing-styles';
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
      className="flex-1"
      id="main-content">
      <section
        className={cn(
          pageGrid,
          reveal,
          'items-center gap-y-12 py-[clamp(4rem,10vw,9rem)]',
        )}>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-1 md:col-end-7">
          <p className={eyebrow}>
            <span>{index}</span>
            Unwired product
          </p>
          <h1
            className={cn(
              displayTitle,
              'max-w-[9ch] text-[clamp(4rem,10vw,8.5rem)]',
            )}>
            {title}
          </h1>
          <p className="text-muted-foreground max-w-[38rem] text-xl leading-[1.65]">
            {description}
          </p>
          <Link
            className={cn(buttonVariants({ size: 'lg' }), ctaButton)}
            href="/products/waitlist">
            Join the product waitlist
            <ArrowUpRight />
          </Link>
        </div>
        <ProductVisual
          className="col-span-full w-full md:col-start-8 md:col-end-13 md:min-h-[34rem]"
          kind={kind}
        />
      </section>

      <section
        className={cn(
          pageGrid,
          reveal,
          revealDelay,
          'gap-y-12 border-t border-border py-[clamp(4rem,9vw,8rem)]',
        )}>
        <aside
          className="text-muted-foreground col-span-full flex flex-wrap gap-x-6 gap-y-3 self-start text-xs font-semibold tracking-[0.1em] uppercase md:col-start-1 md:col-end-4 md:flex-col [&_p]:before:mr-2 [&_p]:before:text-[var(--signal)] [&_p]:before:content-['•']"
          aria-label="Product summary">
          <p>Coming soon</p>
          <p>macOS · iOS · iPadOS</p>
          <p>On-device AI</p>
        </aside>
        <article className="[&_h2]:font-heading [&_li]:text-muted-foreground [&_p]:text-muted-foreground col-span-full md:col-start-5 md:col-end-12 [&_h2]:mt-16 [&_h2]:max-w-[17ch] [&_h2]:text-[clamp(2.2rem,5vw,4.4rem)] [&_h2]:leading-[0.98] [&_h2]:font-semibold [&_h2]:tracking-[-0.065em] [&_h2]:text-balance [&_li]:grid [&_li]:max-w-[67ch] [&_li]:grid-cols-[auto_1fr] [&_li]:gap-4 [&_li]:text-[1.08rem] [&_li]:leading-[1.75] [&_li]:before:text-[var(--signal)] [&_li]:before:content-['↳'] [&_p]:mt-6 [&_p]:max-w-[67ch] [&_p]:text-[1.08rem] [&_p]:leading-[1.75] [&_ul]:mt-6 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-col [&_ul]:gap-4 [&>:first-child]:mt-0 [&>h1]:hidden">
          {children}
        </article>
      </section>

      <section
        className={cn(
          pageGrid,
          reveal,
          'gap-y-12 border-t border-border py-[clamp(4rem,9vw,8rem)]',
        )}>
        <p className={cn(eyebrow, 'col-span-full md:col-start-1 md:col-end-4')}>
          <span>{index}</span>
          Follow the work
        </p>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-5 md:col-end-12">
          <h2 className="font-heading max-w-[14ch] text-[clamp(2.7rem,7vw,6rem)] leading-[0.92] font-semibold tracking-[-0.065em] text-balance">
            Interested in where this is going?
          </h2>
          <p className="text-muted-foreground max-w-[40rem] text-[1.08rem] leading-[1.7]">
            Join one shared list for Unwired Mail and Unwired Calendar updates.
            Choose the products and Apple platforms you care about.
          </p>
          <Link
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              ctaButton,
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
