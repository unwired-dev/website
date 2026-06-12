import { Badge } from '@unwired/ui/components/badge';
import { buttonVariants } from '@unwired/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@unwired/ui/components/card';
import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import { BookingModal } from '@/components/booking-modal';

const products = [
  {
    name: 'Unwired Mail',
    outcome: 'Privacy-first email with on-device AI.',
    description:
      'A coming soon email app for macOS, iOS, and iPadOS focused on personal communication.',
    mark: 'M',
  },
  {
    name: 'Unwired Calendar',
    outcome: 'Remember what matters with on-device AI.',
    description:
      'A coming soon calendar app for macOS, iOS, and iPadOS focused on personal time.',
    mark: 'C',
  },
];

const servicePoints = [
  'Hands-on implementation for critical React interfaces',
  'Frontend leadership for teams making product delivery decisions',
  'UI architecture that keeps complex interfaces maintainable',
  'Design-system work grounded in production code',
];

const experiencePoints = [
  'Senior frontend implementation across product teams and React codebases',
  'UI architecture and design-system judgment for shipping interfaces',
  'Founder-led product work behind Unwired Mail and Unwired Calendar',
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      className="tracking-[0.3em] uppercase"
      variant="secondary">
      {children}
    </Badge>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-6 py-16 sm:px-10 lg:px-12">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="flex flex-col gap-8">
          <SectionLabel>Unwired</SectionLabel>
          <div className="flex flex-col gap-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Unwired builds on-device AI products and helps teams ship better
              frontends.
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8 sm:text-xl">
              The same product judgment behind Unwired Mail and Unwired Calendar
              is available to product teams through Frontend Consultancy.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              className={cn(
                buttonVariants({ size: 'lg' }),
                'rounded-full px-6',
              )}
              href="#products">
              Explore products
            </Link>
            <Link
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'rounded-full px-6',
              )}
              href="#services">
              See services
            </Link>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <SectionLabel>Portfolio</SectionLabel>
            <CardTitle className="text-2xl tracking-[-0.03em]">
              Products first, consultancy with the same standards.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-7">
              Unwired is building on-device AI apps for personal communication
              and time while helping product teams make stronger frontend
              decisions.
            </p>
          </CardContent>
        </Card>
      </section>

      <section
        className="flex flex-col gap-8"
        id="products">
        <div className="flex max-w-3xl flex-col gap-5">
          <SectionLabel>Products</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            On-device AI for personal communication and time.
          </h2>
          <p className="text-muted-foreground text-lg leading-8">
            Unwired Mail and Unwired Calendar are separate coming soon products
            under one product philosophy: personal context should stay close to
            the person using it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Card
              className="shadow-lg"
              key={product.name}>
              <CardHeader>
                <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-2xl text-lg font-semibold">
                  {product.mark}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <CardTitle className="text-2xl tracking-[-0.03em]">
                      {product.name}
                    </CardTitle>
                    <Badge variant="outline">Coming soon</Badge>
                  </div>
                  <CardDescription className="text-base leading-7">
                    {product.outcome}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <p className="text-muted-foreground text-base leading-7">
                  {product.description}
                </p>
                <Link
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-fit rounded-full',
                  )}
                  href="/products/waitlist">
                  Join the product waitlist
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="grid gap-8 rounded-3xl bg-slate-950 p-8 text-white shadow-xl sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
        id="services">
        <div className="flex flex-col gap-5">
          <Badge className="w-fit tracking-[0.3em] uppercase">Services</Badge>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Senior frontend consultancy for product teams.
          </h2>
          <p className="text-lg leading-8 text-slate-300">
            Frontend Consultancy is Unwired&apos;s primary service for teams
            that need senior implementation, clearer React interface direction,
            and frontend leadership without adding a permanent lead first.
          </p>
          <div>
            <BookingModal />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {servicePoints.map((point) => (
            <Card
              className="border-white/10 bg-white/10 text-white shadow-none"
              key={point}>
              <CardContent className="p-5 text-base leading-7">
                {point}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="flex flex-col gap-5">
          <SectionLabel>Selected Experience</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Founder-led judgment backed by shipped frontend work.
          </h2>
          <p className="text-muted-foreground text-lg leading-8">
            Jan Šilhan&apos;s public work history is the reference point for
            Unwired&apos;s frontend leadership, implementation, and product
            taste.
          </p>
          <a
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-fit rounded-full',
            )}
            href="https://www.linkedin.com/in/jan-%C5%A1ilhan/"
            rel="noreferrer"
            target="_blank">
            View Jan&apos;s LinkedIn
          </a>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <ul className="flex flex-col gap-4 text-base leading-7">
              {experiencePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section
        className="grid gap-8 border-t pt-16 lg:grid-cols-[0.8fr_1.2fr]"
        id="about">
        <div className="flex flex-col gap-5">
          <SectionLabel>About</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Built by Jan Šilhan
          </h2>
        </div>
        <div className="flex flex-col gap-6 text-lg leading-8">
          <p className="text-muted-foreground">
            Jan builds on-device AI products for personal communication and time
            while helping product teams ship high-quality React interfaces.
          </p>
          <p className="text-muted-foreground">
            Unwired keeps the product and service paths connected: the product
            work sharpens the consultancy judgment, and the consultancy keeps
            the product standards grounded in real frontend delivery.
          </p>
        </div>
      </section>
    </main>
  );
}
