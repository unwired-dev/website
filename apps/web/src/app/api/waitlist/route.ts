import { sendWaitlistConfirmation, sendWaitlistNotification } from '@/features/waitlist/email';
import { validateWaitlistSubmission } from '@/features/waitlist/validation';

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.WAITLIST_FROM_EMAIL;
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL;

  if (!apiKey || !fromEmail || !notifyEmail) {
    return Response.json({ error: 'Waitlist email is not configured.' }, { status: 500 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const validation = validateWaitlistSubmission(body);

  if (!validation.ok) {
    return Response.json({ errors: validation.errors }, { status: 400 });
  }

  try {
    await Promise.all([
      sendWaitlistConfirmation({
        apiKey,
        fromEmail,
        submission: validation.submission,
      }),
      sendWaitlistNotification({
        apiKey,
        fromEmail,
        notifyEmail,
        submission: validation.submission,
      }),
    ]);
  } catch {
    return Response.json({ error: 'Unable to process waitlist submission.' }, { status: 502 });
  }

  return Response.json(
    {
      message: 'You are on the Unwired product waitlist.',
    },
    { status: 202 },
  );
}
