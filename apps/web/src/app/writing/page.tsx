import type { Metadata } from 'next';

import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import {
  displayTitle,
  eyebrow,
  pageGrid,
  reveal,
  revealDelay,
} from '@/components/marketing-styles';
import { getWritingEntries } from '@/content/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes from Unwired on frontend implementation, product interfaces, and on-device AI products.',
};

function formatPublishedAt(publishedAt: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${publishedAt}T00:00:00Z`));
}

export default async function WritingPage() {
  const entries = await getWritingEntries();

  return (
    <main
      className="flex-1"
      id="main-content">
      <section
        className={cn(pageGrid, reveal, 'gap-y-16 py-[clamp(4rem,10vw,9rem)]')}>
        <header className="col-span-full flex flex-col items-start gap-6 md:col-start-1 md:col-end-9">
          <p className={eyebrow}>
            <span aria-hidden="true">↳</span>
            Writing
          </p>
          <h1 className={cn(displayTitle, 'max-w-[10ch]')}>Working notes.</h1>
          <p className="text-muted-foreground max-w-[42rem] text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.65]">
            Notes from Unwired on frontend implementation, product interfaces,
            and building on-device AI products for personal communication and
            time.
          </p>
        </header>

        <div
          className={cn(
            reveal,
            revealDelay,
            'col-span-full border-t border-border md:col-start-5 md:col-end-13',
          )}>
          {entries.length > 0 ? (
            <ol className="list-none">
              {entries.map((entry) => (
                <li
                  className="border-border border-b py-8"
                  key={entry.slug}>
                  <article className="grid gap-4 md:grid-cols-[8rem_1fr] md:gap-8">
                    <time
                      className="text-muted-foreground text-xs tabular-nums"
                      dateTime={entry.publishedAt}>
                      {formatPublishedAt(entry.publishedAt)}
                    </time>
                    <div className="flex flex-col gap-3">
                      <h2 className="font-heading text-[clamp(1.8rem,4vw,3.2rem)] leading-[1] font-[580] tracking-[-0.05em]">
                        <Link
                          className="focus-visible:outline-ring decoration-[var(--signal)] underline-offset-[0.18em] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                          href={`/writing/${entry.slug}`}>
                          {entry.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground max-w-[42rem] leading-[1.65]">
                        {entry.summary}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <div className="grid gap-4 py-8 md:grid-cols-[8rem_1fr] md:gap-8">
              <p className="text-xs font-[650] tracking-[0.12em] text-[var(--signal)] uppercase">
                Status
              </p>
              <p className="text-muted-foreground max-w-[38rem] leading-[1.7]">
                Nothing published yet. This index will open up as substantive
                notes and case studies are ready.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
