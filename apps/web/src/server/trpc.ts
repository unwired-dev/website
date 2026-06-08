import { initTRPC } from '@trpc/server';

interface TRPCContextOptions {
  readonly env?: Record<string, string | undefined>;
  readonly fetchImplementation?: typeof fetch;
}

export function createTRPCContext({
  env = process.env,
  fetchImplementation = fetch,
}: TRPCContextOptions = {}) {
  return {
    env,
    fetchImplementation,
  };
}

const t = initTRPC.context<ReturnType<typeof createTRPCContext>>().create();
const { createCallerFactory, procedure: publicProcedure, router } = t;

export { createCallerFactory, publicProcedure, router };
