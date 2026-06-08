import { waitlistRouter } from '@/server/routers/waitlist';
import { router } from '@/server/trpc';

export const appRouter = router({
  waitlist: waitlistRouter,
});

export type AppRouter = typeof appRouter;
