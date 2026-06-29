import type { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getWritingDocument, getWritingEntries } from '@/content/writing';

export const dynamicParams = false;

interface WritingPageProps {
  params: Promise<{ slug: string }>;
}

function formatPublishedAt(publishedAt: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${publishedAt}T00:00:00Z`));
}

export async function generateStaticParams() {
  const entries = await getWritingEntries();

  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = await getWritingDocument(slug);

  return document
    ? {
        title: `${document.title} | Unwired`,
        description: document.summary,
      }
    : {};
}

export default async function WritingEntryPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const document = await getWritingDocument(slug);

  if (!document) {
    notFound();
  }

  const { Content } = document;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:px-10">
      <article>
        <header className="mb-10 flex flex-col gap-5 border-b pb-10">
          <Link
            className="text-muted-foreground w-fit text-sm hover:underline"
            href="/writing">
            Writing
          </Link>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            {document.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-8">
            {document.summary}
          </p>
          <time
            className="text-muted-foreground text-sm"
            dateTime={document.publishedAt}>
            {formatPublishedAt(document.publishedAt)}
          </time>
        </header>
        <Content />
      </article>
    </main>
  );
}
