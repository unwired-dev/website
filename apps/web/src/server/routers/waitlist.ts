import { TRPCError } from '@trpc/server';

import type { WaitlistSubmission } from '@/features/waitlist/validation';

import {
  sendWaitlistConfirmation,
  sendWaitlistNotification,
} from '@/features/waitlist/email';
import { validateWaitlistSubmission } from '@/features/waitlist/validation';
import { publicProcedure, router } from '@/server/trpc';

const waitlistSuccessMessage = 'You are on the Unwired product waitlist.';

function parseWaitlistSubmission(input: unknown): WaitlistSubmission {
  const validation = validateWaitlistSubmission(input);

  if (!validation.ok) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: validation.errors.join(' '),
    });
  }

  return validation.submission;
}

function readRequiredEmailConfig(env: Record<string, string | undefined>) {
  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.WAITLIST_FROM_EMAIL;
  const notifyEmail = env.WAITLIST_NOTIFY_EMAIL;

  if (!apiKey || !fromEmail || !notifyEmail) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Waitlist email is not configured.',
    });
  }

  return { apiKey, fromEmail, notifyEmail };
}

export const waitlistRouter = router({
  join: publicProcedure
    .input(parseWaitlistSubmission)
    .mutation(async ({ ctx, input }) => {
      const { apiKey, fromEmail, notifyEmail } = readRequiredEmailConfig(
        ctx.env,
      );

      try {
        await Promise.all([
          sendWaitlistConfirmation({
            apiKey,
            fromEmail,
            submission: input,
            fetchImplementation: ctx.fetchImplementation,
          }),
          sendWaitlistNotification({
            apiKey,
            fromEmail,
            notifyEmail,
            submission: input,
            fetchImplementation: ctx.fetchImplementation,
          }),
        ]);
      } catch {
        throw new TRPCError({
          code: 'BAD_GATEWAY',
          message: 'Unable to process waitlist submission.',
        });
      }

      return {
        message: waitlistSuccessMessage,
      };
    }),
});
