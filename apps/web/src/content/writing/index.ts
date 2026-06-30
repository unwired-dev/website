import type { ComponentType } from 'react';

export interface WritingMetadata {
  title: string;
  summary: string;
  publishedAt: string;
}

export interface WritingEntry extends WritingMetadata {
  slug: string;
}

interface WritingModule {
  default: ComponentType;
  metadata: WritingMetadata;
}

type WritingLoader = () => Promise<WritingModule>;

const writingLoaders: Record<string, WritingLoader> = {};

async function loadWritingEntry(
  slug: string,
  loader: WritingLoader,
): Promise<WritingEntry & { Content: ComponentType }> {
  const { default: Content, metadata } = await loader();

  return { ...metadata, slug, Content };
}

export async function getWritingEntries(): Promise<WritingEntry[]> {
  const entries = await Promise.all(
    Object.entries(writingLoaders).map(([slug, loader]) =>
      loadWritingEntry(slug, loader),
    ),
  );

  const publishedEntries = entries.map(
    ({ Content: _Content, ...entry }) => entry,
  );

  // oxlint-disable-next-line unicorn/no-array-sort -- ES2023 Array#toSorted is outside the project's target library.
  return publishedEntries.sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export async function getWritingDocument(slug: string) {
  const loader = writingLoaders[slug];

  return loader ? loadWritingEntry(slug, loader) : null;
}
