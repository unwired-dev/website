import type { WaitlistSubmission } from './validation';

interface SendConfirmationOptions {
  readonly apiKey: string;
  readonly fromEmail: string;
  readonly submission: WaitlistSubmission;
  readonly fetchImplementation?: typeof fetch;
}

interface SendNotificationOptions extends SendConfirmationOptions {
  readonly notifyEmail: string;
}

const productLabels: Record<
  WaitlistSubmission['productInterests'][number],
  string
> = {
  'unwired-mail': 'Unwired Mail',
  'unwired-calendar': 'Unwired Calendar',
};

const platformLabels: Record<
  WaitlistSubmission['platformInterests'][number],
  string
> = {
  macos: 'macOS',
  ios: 'iOS',
  ipados: 'iPadOS',
};

function formatList(values: readonly string[]): string {
  if (values.length === 1) {
    return values[0] ?? '';
  }

  const finalValue = values.at(-1);
  const initialValues = values.slice(0, -1);

  return `${initialValues.join(', ')} and ${finalValue}`;
}

function renderConfirmationText(submission: WaitlistSubmission): string {
  const products = formatList(
    submission.productInterests.map((value) => productLabels[value]),
  );
  const platforms = formatList(
    submission.platformInterests.map((value) => platformLabels[value]),
  );

  return [
    'Thanks for joining the Unwired product waitlist.',
    '',
    `Product interest: ${products}.`,
    `Platform interest: ${platforms}.`,
    '',
    'Unwired product updates may cover both Unwired Mail and Unwired Calendar by default.',
    '',
    'Jan Silhan',
    'Unwired',
  ].join('\n');
}

function renderNotificationText(submission: WaitlistSubmission): string {
  const products = formatList(
    submission.productInterests.map((value) => productLabels[value]),
  );
  const platforms = formatList(
    submission.platformInterests.map((value) => platformLabels[value]),
  );

  return [
    'New Unwired product waitlist submission.',
    '',
    `Email: ${submission.email}`,
    `Product interest: ${products}`,
    `Platform interest: ${platforms}`,
    `Source page: ${submission.sourcePage}`,
    `Created at: ${submission.createdAt}`,
    `Consent: ${submission.productUpdateConsent ? 'yes' : 'no'}`,
  ].join('\n');
}

export async function sendWaitlistConfirmation({
  apiKey,
  fromEmail,
  submission,
  fetchImplementation = fetch,
}: SendConfirmationOptions): Promise<void> {
  const response = await fetchImplementation('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [submission.email],
      subject: "You're on the Unwired product waitlist",
      text: renderConfirmationText(submission),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend rejected the confirmation email with ${response.status}.`,
    );
  }
}

export async function sendWaitlistNotification({
  apiKey,
  fromEmail,
  notifyEmail,
  submission,
  fetchImplementation = fetch,
}: SendNotificationOptions): Promise<void> {
  const response = await fetchImplementation('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      subject: 'New Unwired product waitlist submission',
      text: renderNotificationText(submission),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend rejected the waitlist notification with ${response.status}.`,
    );
  }
}
