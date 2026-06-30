import type { Metadata } from 'next';

import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  eyebrow,
  pageGrid,
  reveal,
  revealDelay,
} from '@/components/marketing-styles';
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
        title: document.title,
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
    <main
      className="flex-1"
      id="main-content">
      <article
        className={cn(pageGrid, reveal, 'gap-y-16 py-[clamp(4rem,10vw,9rem)]')}>
        <header className="col-span-full flex flex-col items-start gap-6 md:col-start-1 md:col-end-10">
          <Link
            className={cn(
              eyebrow,
              'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
            )}
            href="/writing">
            <span aria-hidden="true">←</span>
            Writing
          </Link>
          <h1 className="font-heading max-w-[13ch] text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] font-[580] tracking-[-0.065em] text-balance">
            {document.title}
          </h1>
          <p className="text-muted-foreground max-w-[42rem] text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.65]">
            {document.summary}
          </p>
          <time
            className="text-muted-foreground border-border border-t pt-4 text-xs tabular-nums"
            dateTime={document.publishedAt}>
            {formatPublishedAt(document.publishedAt)}
          </time>
        </header>
        <div
          className={cn(
            reveal,
            revealDelay,
            'col-span-full border-t border-border pt-12 md:col-start-5 md:col-end-12 [&_a]:underline [&_a]:decoration-[var(--signal)] [&_a]:underline-offset-[0.2em] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-ring [&_h2]:font-heading [&_h2]:mt-16 [&_h2]:max-w-[16ch] [&_h2]:text-[clamp(2.2rem,5vw,4.4rem)] [&_h2]:leading-[0.98] [&_h2]:font-[580] [&_h2]:tracking-[-0.06em] [&_h2]:text-balance [&_li]:text-muted-foreground [&_li]:text-[1.08rem] [&_li]:leading-[1.75] [&_p]:text-muted-foreground [&_p]:mt-6 [&_p]:max-w-[67ch] [&_p]:text-[1.08rem] [&_p]:leading-[1.75] [&_ul]:mt-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-4 [&>:first-child]:mt-0 [&>h1]:hidden',
          )}>
          <Content />
        </div>
      </article>
    </main>
  );
}
