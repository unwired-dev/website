import {
  sendWaitlistConfirmation,
  sendWaitlistNotification,
} from '@/features/waitlist/email';
import { validateWaitlistSubmission } from '@/features/waitlist/validation';

interface WaitlistRouteEnv {
  readonly [key: string]: string | undefined;
  readonly RESEND_API_KEY?: string;
  readonly WAITLIST_FROM_EMAIL?: string;
  readonly WAITLIST_NOTIFY_EMAIL?: string;
}

interface WaitlistRouteOptions {
  readonly env: WaitlistRouteEnv;
  readonly fetchImplementation?: typeof fetch;
}

async function parseJsonBody(request: Request): Promise<
  | {
      readonly ok: true;
      readonly value: unknown;
    }
  | {
      readonly ok: false;
    }
> {
  try {
    return { ok: true, value: await request.json() };
  } catch {
    return { ok: false };
  }
}

export function createWaitlistPostHandler({
  env,
  fetchImplementation = fetch,
}: WaitlistRouteOptions): (request: Request) => Promise<Response> {
  return async function postWaitlistSubmission(
    request: Request,
  ): Promise<Response> {
    const apiKey = env.RESEND_API_KEY;
    const fromEmail = env.WAITLIST_FROM_EMAIL;
    const notifyEmail = env.WAITLIST_NOTIFY_EMAIL;

    if (!apiKey || !fromEmail || !notifyEmail) {
      return Response.json(
        { error: 'Waitlist email is not configured.' },
        { status: 500 },
      );
    }

    const body = await parseJsonBody(request);

    if (!body.ok) {
      return Response.json(
        { error: 'Request body must be valid JSON.' },
        { status: 400 },
      );
    }

    const validation = validateWaitlistSubmission(body.value);

    if (!validation.ok) {
      return Response.json({ errors: validation.errors }, { status: 400 });
    }

    try {
      await Promise.all([
        sendWaitlistConfirmation({
          apiKey,
          fromEmail,
          submission: validation.submission,
          fetchImplementation,
        }),
        sendWaitlistNotification({
          apiKey,
          fromEmail,
          notifyEmail,
          submission: validation.submission,
          fetchImplementation,
        }),
      ]);
    } catch {
      return Response.json(
        { error: 'Unable to process waitlist submission.' },
        { status: 502 },
      );
    }

    return Response.json(
      {
        message: 'You are on the Unwired product waitlist.',
      },
      { status: 202 },
    );
  };
}

export const POST = createWaitlistPostHandler({
  env: process.env,
});
