import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import {
  ctaButton,
  displayTitle,
  eyebrow,
  leadCopy,
  pageGrid,
  reveal,
  revealDelay,
  sectionHeading,
} from '@/components/marketing-styles';
import { ArrowUpRight, ProductVisual } from '@/components/product-visual';

const bookingUrl = 'https://cal.com/jan-silhan-unwired/frontend-consultation';

const services = [
  {
    index: '01',
    title: 'Implementation',
    description:
      'Hands-on delivery for critical React interfaces where quality, momentum, and senior judgment matter.',
  },
  {
    index: '02',
    title: 'Frontend direction',
    description:
      'Clear technical leadership for teams making consequential product and interface decisions.',
  },
  {
    index: '03',
    title: 'UI architecture',
    description:
      'Structures that keep complex interfaces understandable, maintainable, and ready to evolve.',
  },
  {
    index: '04',
    title: 'Design systems',
    description:
      'Reusable foundations shaped by production needs, not component-library theatre.',
  },
];

const experience = [
  'Senior frontend implementation across product teams and React codebases.',
  'UI architecture and design-system judgment grounded in shipping interfaces.',
  'Founder-led product work behind Unwired Mail and Unwired Calendar.',
];

interface ProductFeatureProps {
  readonly className: string;
  readonly description: string;
  readonly href: string;
  readonly index: string;
  readonly kind: 'calendar' | 'mail';
  readonly name: string;
}

function ProductFeature({
  className,
  description,
  href,
  index,
  kind,
  name,
}: ProductFeatureProps) {
  return (
    <Link
      className={cn(reveal, 'group col-span-full grid gap-6', className)}
      href={href}>
      <ProductVisual kind={kind} />
      <div className="border-border grid gap-6 border-b pb-6 md:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-4">
          <p className={eyebrow}>
            <span>{index}</span>
            Coming soon
          </p>
          <h3 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.95] font-[580] tracking-[-0.055em]">
            {name}
          </h3>
        </div>
        <p className="text-muted-foreground leading-[1.65]">{description}</p>
        <span className="col-span-full inline-flex items-center gap-2 text-[0.88rem] font-[650] [&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-[180ms] [&_svg]:ease-[var(--ease-out-expo)] group-hover:[&_svg]:translate-x-[0.12rem] group-hover:[&_svg]:-translate-y-[0.12rem]">
          Read the product story
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main
      className="flex-1"
      id="main-content">
      <section
        className={cn(
          pageGrid,
          reveal,
          'min-h-[min(52rem,calc(100svh-5rem))] items-end gap-y-16 pt-[clamp(4rem,9vw,8rem)] pb-16',
        )}>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-1 md:col-end-9">
          <p className={eyebrow}>
            <span>00</span>
            Products &amp; frontend consultancy
          </p>
          <h1
            className={cn(
              displayTitle,
              '[&_em]:block [&_em]:font-[480] [&_em]:text-muted-foreground [&_em]:not-italic',
            )}>
            Better products. <em>Better frontends.</em>
          </h1>
          <p className="text-muted-foreground max-w-[42rem] text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.6]">
            Unwired builds on-device AI products and helps ambitious teams ship
            clearer, stronger React interfaces.
          </p>
          <Link
            className={cn(buttonVariants({ size: 'lg' }), ctaButton)}
            href="#products">
            Explore products
            <ArrowUpRight />
          </Link>
        </div>

        <aside
          aria-label="Unwired disciplines"
          className="border-border col-span-full flex flex-col gap-6 border-t pt-6 md:col-start-10 md:col-end-13">
          <p className="text-[0.7rem] font-[650] tracking-[0.14em] text-[var(--signal)] uppercase">
            Practice register
          </p>
          <ol className="[&_li_span]:text-muted-foreground grid list-none gap-3 [&_li]:grid [&_li]:min-h-0 [&_li]:grid-cols-[auto_1fr] [&_li]:items-center [&_li]:gap-4 [&_li]:border-b [&_li]:border-[color-mix(in_oklch,var(--border),transparent_35%)] [&_li]:pb-3 [&_li]:text-[0.92rem] [&_li_span]:text-[0.65rem] [&_li_span]:tabular-nums">
            <li>
              <span>01</span>
              On-device AI products
            </li>
            <li>
              <span>02</span>
              Frontend implementation
            </li>
            <li>
              <span>03</span>
              UI architecture
            </li>
            <li>
              <span>04</span>
              Design systems
            </li>
          </ol>
          <p className="text-muted-foreground max-w-96 text-[0.86rem] leading-[1.6]">
            Independent, founder-led, and close to the work.
          </p>
        </aside>
      </section>

      <section
        className={cn(
          pageGrid,
          'gap-y-24 border-t border-border py-[clamp(5rem,11vw,10rem)]',
        )}
        id="products">
        <div
          className={cn(
            reveal,
            'col-span-full flex flex-col gap-6 md:col-start-1 md:col-end-9',
          )}>
          <p className={eyebrow}>
            <span>01</span>
            Products
          </p>
          <h2 className={sectionHeading}>
            Personal context should stay personal.
          </h2>
          <p className={leadCopy}>
            Unwired Mail and Unwired Calendar are separate products shaped by
            one idea: useful AI can work close to your communication and time.
          </p>
        </div>

        <ProductFeature
          className="md:col-start-1 md:col-end-7 md:[&_.product-visual]:min-h-[30rem]"
          description="Privacy-first email with on-device AI."
          href="/unwired-mail"
          index="01"
          kind="mail"
          name="Unwired Mail"
        />

        <ProductFeature
          className={cn(
            revealDelay,
            'md:col-start-7 md:col-end-13 md:mt-32 md:[&_.product-visual]:min-h-[30rem]',
          )}
          description="Remember what matters with on-device AI."
          href="/unwired-calendar"
          index="02"
          kind="calendar"
          name="Unwired Calendar"
        />
      </section>

      <section
        aria-labelledby="services-title"
        className="border-border border-y bg-[var(--surface-1)] py-[clamp(5rem,11vw,10rem)]"
        id="services">
        <div className={cn(pageGrid, 'gap-y-16')}>
          <div
            className={cn(
              reveal,
              'col-span-full flex flex-col items-start gap-6 md:sticky md:top-8 md:col-start-1 md:col-end-6 md:self-start',
            )}>
            <p className={eyebrow}>
              <span>02</span>
              Frontend Consultancy
            </p>
            <h2
              className={sectionHeading}
              id="services-title">
              Senior frontend help, without the hand‑off chain.
            </h2>
            <p className={leadCopy}>
              The same product judgment behind Unwired Mail and Unwired Calendar
              is available directly to teams that need implementation and
              frontend leadership.
            </p>
            <a
              className={cn(buttonVariants({ size: 'lg' }), ctaButton)}
              href={bookingUrl}
              rel="noreferrer"
              target="_blank">
              Book a frontend consultation
              <ArrowUpRight />
            </a>
          </div>

          <ol
            className={cn(
              reveal,
              revealDelay,
              'col-span-full list-none md:col-start-7 md:col-end-13 [&_li]:grid [&_li]:grid-cols-[auto_1fr] [&_li]:gap-4 [&_li]:border-t [&_li]:border-border [&_li]:py-6 [&_li>span]:text-[0.7rem] [&_li>span]:text-[var(--signal)] [&_li>span]:tabular-nums [&_h3]:font-heading [&_h3]:text-[1.45rem] [&_h3]:font-semibold [&_h3]:tracking-[-0.035em] [&_p]:col-start-2 [&_p]:leading-[1.65] [&_p]:text-muted-foreground',
            )}>
            {services.map((service) => (
              <li key={service.index}>
                <span>{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={cn(
          pageGrid,
          reveal,
          'gap-y-16 py-[clamp(5rem,11vw,10rem)]',
        )}>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-1 md:col-end-7">
          <p className={eyebrow}>
            <span>03</span>
            Selected experience
          </p>
          <h2 className={sectionHeading}>
            Judgment backed by shipped frontend work.
          </h2>
        </div>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-8 md:col-end-13">
          <p className={leadCopy}>
            Jan Šilhan&apos;s public work history is the reference point for
            Unwired&apos;s frontend leadership, implementation, and product
            taste.
          </p>
          <ol className="[&_li]:border-border w-full list-none [&_li]:grid [&_li]:grid-cols-[2rem_1fr] [&_li]:gap-4 [&_li]:border-t [&_li]:py-4 [&_li]:leading-[1.6] [&_li>span]:text-xs [&_li>span]:text-[var(--signal)] [&_li>span]:tabular-nums">
            {experience.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
          <a
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              ctaButton,
            )}
            href="https://www.linkedin.com/in/jan-%C5%A1ilhan/"
            rel="noreferrer"
            target="_blank">
            View Jan&apos;s LinkedIn
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section
        className={cn(
          pageGrid,
          reveal,
          'gap-y-16 border-t border-border py-[clamp(5rem,11vw,10rem)]',
        )}
        id="about">
        <p
          className={cn(
            eyebrow,
            'col-span-full self-start md:col-start-1 md:col-end-4',
          )}>
          <span>04</span>
          About
        </p>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-5 md:col-end-13">
          <h2 className={sectionHeading}>
            Built by Jan Šilhan, close to the product and the code.
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <p className={leadCopy}>
              Jan builds on-device AI products for personal communication and
              time while helping product teams ship high-quality React
              interfaces.
            </p>
            <p className={leadCopy}>
              The product work sharpens the consultancy judgment. The
              consultancy keeps the product standards grounded in real frontend
              delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
