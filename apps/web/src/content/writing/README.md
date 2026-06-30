# Writing content

Repo-owned articles, notes, and substantiated case studies live here as MDX.
The public route is `/writing/[slug]`, with `/writing` as the index. The index
stays out of primary navigation until the first entry is ready.

To publish an entry:

1. Create `<slug>.mdx` in this directory.
2. Export metadata with a title, summary, and ISO `YYYY-MM-DD` publication date.
3. Add the slug and a static import to `writingLoaders` in `index.ts`.

```mdx
export const metadata = {
  title: 'A specific, useful title',
  summary: 'A concise description used by the writing index and page metadata.',
  publishedAt: '2026-06-29',
};

Start the article here. The route supplies the title and publication date.
```

```ts
const writingLoaders: Record<string, WritingLoader> = {
  'article-slug': () => import('./article-slug.mdx'),
};
```

The `src/types/mdx.d.ts` declaration types each MDX module's default component
and metadata export against `WritingMetadata`.

Keep the slug URL-safe and stable. Only publish case studies when the claims and
company references are approved; category-level experience remains the default.
