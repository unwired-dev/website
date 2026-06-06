import type { ComponentType, ReactNode } from 'react';

type MDXComponentProps = {
  children?: ReactNode;
} & Record<string, unknown>;

type MDXComponents = Record<string, ComponentType<MDXComponentProps>>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl"
        {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-12 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-3xl"
        {...props}>
        {children}
      </h2>
    ),
    p: ({ children, ...props }) => (
      <p
        className="mt-5 text-lg leading-8 text-[var(--color-muted)]"
        {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="mt-5 space-y-3 pl-6"
        {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }) => (
      <li
        className="text-lg leading-8 text-[var(--color-ink)]"
        {...props}>
        {children}
      </li>
    ),
    ...components,
  };
}
