'use client';

import { QueryClient } from '@tanstack/react-query';
import { createTRPCContext } from '@trpc/tanstack-react-query';

import type { AppRouter } from '@/server/routers/root';

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
