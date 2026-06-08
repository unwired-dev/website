'use client';

import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { useMemo } from 'react';

import type { AppRouter } from '@/server/routers/root';

import { makeQueryClient, TRPCProvider } from '@/trpc/client';

let browserQueryClient: ReturnType<typeof makeQueryClient> | undefined =
  undefined;

function getQueryClient() {
  if (globalThis.window === undefined) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();

  return browserQueryClient;
}

export function AppTRPCProvider({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => getQueryClient(), []);
  const trpcClient = useMemo(
    () =>
      createTRPCClient<AppRouter>({
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider
        queryClient={queryClient}
        trpcClient={trpcClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
