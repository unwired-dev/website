import type { Metadata } from 'next';

import Link from 'next/link';

import { getWritingEntries } from '@/content/writing';

export const metadata: Metadata = {
  title: 'Writing | Unwired',
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
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:px-10">
      <div className="flex flex-col gap-6 border-b pb-10">
        <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          Writing
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-8">
          Notes from Unwired on frontend implementation, product interfaces, and
          building on-device AI products for personal communication and time.
        </p>
      </div>

      {entries.length > 0 ? (
        <ol className="divide-y">
          {entries.map((entry) => (
            <li
              className="py-8"
              key={entry.slug}>
              <article className="flex flex-col gap-3">
                <time
                  className="text-muted-foreground text-sm"
                  dateTime={entry.publishedAt}>
                  {formatPublishedAt(entry.publishedAt)}
                </time>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                  <Link
                    className="decoration-foreground/30 underline-offset-4 hover:underline"
                    href={`/writing/${entry.slug}`}>
                    {entry.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground text-base leading-7">
                  {entry.summary}
                </p>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-muted-foreground py-10 text-base leading-7">
          Nothing published yet. This index will open up as substantive notes
          and case studies are ready.
        </p>
      )}
    </main>
  );
}
