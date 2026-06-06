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

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-6 py-16 sm:px-10 lg:px-12">
      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-8">
          <p className="text-sm font-medium tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Founder-led React consultancy
          </p>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
              Unwired helps product teams move faster on React frontend work
              with senior hands-on leadership.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
              Unwired acts as a temporary frontend lead for product teams,
              usually through clearly scoped project engagements. The focus is
              practical: ship better interfaces, make frontend decisions hold
              up, and remove drag from delivery.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] transition-transform hover:-translate-y-0.5"
              href="mailto:hello@unwired.dev">
              Start a conversation
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-strong)]"
              href="https://www.linkedin.com/in/jan-%C5%A1ilhan/"
              target="_blank"
              rel="noreferrer">
              View Jan&apos;s LinkedIn
            </a>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-medium tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Where Unwired fits
          </p>
          <ul className="mt-6 space-y-4 text-base leading-7 text-[var(--color-ink)]">
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
        </aside>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
          <p className="text-sm font-medium tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Core offer
          </p>
          <ul className="mt-6 space-y-4 text-lg leading-8 text-[var(--color-ink)]">
            {offers.map((offer) => (
              <li key={offer}>{offer}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
          <p className="text-sm font-medium tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Credibility model
          </p>
          <ul className="mt-6 space-y-4 text-lg leading-8 text-[var(--color-ink)]">
            {proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-medium tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Product proof
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-4xl">
            Unwired Mail shows the product standards behind the consultancy.
          </h2>
          <p className="text-lg leading-8 text-[var(--color-muted)]">
            Privacy-focused email for macOS and iOS, with local AI and a clear
            emphasis on trustworthy product behavior. It sits on this site as
            evidence of how Unwired thinks about product quality, not as the
            primary conversion path.
          </p>
        </div>
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#111827,#1f2937_45%,#334155)] p-[1px] shadow-[0_20px_80px_rgba(15,23,42,0.2)]">
          <div className="rounded-[calc(2rem-1px)] bg-[rgba(248,250,252,0.96)] p-8">
            <p className="text-sm font-medium tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Unwired Mail
            </p>
            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                Privacy-focused email client for macOS and iOS.
              </h3>
              <p className="text-base leading-7 text-[var(--color-muted)]">
                Built around local AI and a product posture that keeps user
                trust central.
              </p>
              <Link
                href="/unwired-mail"
                className="inline-flex items-center rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-strong)]">
                Explore the product page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
