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

const offers = [
  'Senior React implementation for critical product work',
  'Frontend architecture for scaling product teams',
  'Design-system direction that stays grounded in shipping code',
  'Targeted advisory for teams that need senior frontend judgment',
];

const proofPoints = [
  'Founder-led consultancy with senior hands-on leadership',
  'Primary audience: CTOs, engineering managers, and startup founders',
  'Unwired Mail as product proof of privacy and product taste',
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
      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="flex flex-col gap-8">
          <SectionLabel>Founder-led React consultancy</SectionLabel>
          <div className="flex flex-col gap-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Unwired helps product teams move faster on React frontend work
              with senior hands-on leadership.
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8 sm:text-xl">
              Unwired acts as a temporary frontend lead for product teams,
              usually through clearly scoped project engagements. The focus is
              practical: ship better interfaces, make frontend decisions hold
              up, and remove drag from delivery.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              className={cn(
                buttonVariants({ size: 'lg' }),
                'rounded-full px-6',
              )}
              href="mailto:hello@unwired.dev">
              Start a conversation
            </a>
            <a
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'rounded-full px-6',
              )}
              href="https://www.linkedin.com/in/jan-%C5%A1ilhan/"
              rel="noreferrer"
              target="_blank">
              View Jan&apos;s LinkedIn
            </a>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <SectionLabel>Where Unwired fits</SectionLabel>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4 text-base leading-7">
              <li>
                Product teams that need temporary frontend leadership without
                hiring a full-time lead first.
              </li>
              <li>
                React codebases that need stronger architecture, sharper UI
                execution, or steadier delivery.
              </li>
              <li>
                Teams that want a senior engineer who can both ship and steer.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <SectionLabel>Core offer</SectionLabel>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4 text-lg leading-8">
              {offers.map((offer) => (
                <li key={offer}>{offer}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <SectionLabel>Credibility model</SectionLabel>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4 text-lg leading-8">
              {proofPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="flex flex-col gap-5">
          <SectionLabel>Product proof</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Unwired Mail shows the product standards behind the consultancy.
          </h2>
          <p className="text-muted-foreground text-lg leading-8">
            Privacy-focused email for macOS and iOS, with local AI and a clear
            emphasis on trustworthy product behavior. It sits on this site as
            evidence of how Unwired thinks about product quality, not as the
            primary conversion path.
          </p>
        </div>
        <Card className="overflow-hidden bg-[linear-gradient(135deg,#111827,#1f2937_45%,#334155)] p-px shadow-xl ring-0">
          <Card className="rounded-[calc(var(--radius-2xl)-1px)] bg-[rgba(248,250,252,0.96)] ring-0">
            <CardHeader>
              <SectionLabel>Unwired Mail</SectionLabel>
              <CardTitle className="text-2xl tracking-[-0.03em]">
                Privacy-focused email client for macOS and iOS.
              </CardTitle>
              <CardDescription className="text-base leading-7">
                Built around local AI and a product posture that keeps user
                trust central.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'rounded-full',
                )}
                href="/unwired-mail">
                Explore the product page
              </Link>
            </CardContent>
          </Card>
        </Card>
      </section>
    </main>
  );
}
