import type { ComponentType } from "react";

type MDXComponents = Record<string, ComponentType<Record<string, unknown>>>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-12 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-3xl"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]" {...props} />
    ),
    ul: (props) => <ul className="mt-5 space-y-3 pl-6" {...props} />,
    li: (props) => <li className="text-lg leading-8 text-[var(--color-ink)]" {...props} />,
    ...components,
  };
}
