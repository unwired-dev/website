import type { ComponentType, ReactNode } from 'react';

import { cn } from '@unwired/ui/lib/utils';

type MDXComponentProps = {
  children?: ReactNode;
  className?: string;
} & Record<string, unknown>;

type MDXComponents = Record<string, ComponentType<MDXComponentProps>>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, className, ...props }) => (
      <h1
        className={cn(
          'text-4xl font-semibold tracking-[-0.05em] sm:text-5xl',
          className,
        )}
        {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }) => (
      <h2
        className={cn(
          'mt-12 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl',
          className,
        )}
        {...props}>
        {children}
      </h2>
    ),
    p: ({ children, className, ...props }) => (
      <p
        className={cn(
          'text-muted-foreground mt-5 text-lg leading-8',
          className,
        )}
        {...props}>
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul
        className={cn('mt-5 flex flex-col gap-3 pl-6', className)}
        {...props}>
        {children}
      </ul>
    ),
    li: ({ children, className, ...props }) => (
      <li
        className={cn('text-lg leading-8', className)}
        {...props}>
        {children}
      </li>
    ),
    ...components,
  };
}
