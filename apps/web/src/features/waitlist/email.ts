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

interface ResendEmailOptions {
  readonly apiKey: string;
  readonly fromEmail: string;
  readonly toEmail: string;
  readonly subject: string;
  readonly text: string;
  readonly errorMessage: string;
  readonly fetchImplementation: typeof fetch;
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

function formatProductInterests(submission: WaitlistSubmission): string {
  return formatList(
    submission.productInterests.map((value) => productLabels[value]),
  );
}

function formatPlatformInterests(submission: WaitlistSubmission): string {
  return formatList(
    submission.platformInterests.map((value) => platformLabels[value]),
  );
}

async function sendResendEmail({
  apiKey,
  fromEmail,
  toEmail,
  subject,
  text,
  errorMessage,
  fetchImplementation,
}: ResendEmailOptions): Promise<void> {
  const response = await fetchImplementation('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`${errorMessage} ${response.status}.`);
  }
}

function renderConfirmationText(submission: WaitlistSubmission): string {
  const products = formatProductInterests(submission);
  const platforms = formatPlatformInterests(submission);

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
  const products = formatProductInterests(submission);
  const platforms = formatPlatformInterests(submission);

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
  await sendResendEmail({
    apiKey,
    fromEmail,
    toEmail: submission.email,
    subject: "You're on the Unwired product waitlist",
    text: renderConfirmationText(submission),
    errorMessage: 'Resend rejected the confirmation email with',
    fetchImplementation,
  });
}

export async function sendWaitlistNotification({
  apiKey,
  fromEmail,
  notifyEmail,
  submission,
  fetchImplementation = fetch,
}: SendNotificationOptions): Promise<void> {
  await sendResendEmail({
    apiKey,
    fromEmail,
    toEmail: notifyEmail,
    subject: 'New Unwired product waitlist submission',
    text: renderNotificationText(submission),
    errorMessage: 'Resend rejected the waitlist notification with',
    fetchImplementation,
  });
}
