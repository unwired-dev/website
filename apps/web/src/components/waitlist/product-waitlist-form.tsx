'use client';

import type { ComponentProps } from 'react';

import { useMutation } from '@tanstack/react-query';
import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import { useState } from 'react';

import { useTRPC } from '@/trpc/client';

const productOptions = [
  {
    value: 'unwired-mail',
    label: 'Unwired Mail',
    description: 'Privacy-first email with on-device AI.',
  },
  {
    value: 'unwired-calendar',
    label: 'Unwired Calendar',
    description: 'Remember what matters with on-device AI.',
  },
] as const;

const platformOptions = [
  { value: 'macos', label: 'macOS' },
  { value: 'ios', label: 'iOS' },
  { value: 'ipados', label: 'iPadOS' },
] as const;

type ProductInterest = (typeof productOptions)[number]['value'];
type PlatformInterest = (typeof platformOptions)[number]['value'];
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';
type FormSubmitHandler = NonNullable<ComponentProps<'form'>['onSubmit']>;
interface WaitlistFormSubmission {
  readonly email: string;
  readonly productInterests: readonly ProductInterest[];
  readonly platformInterests: readonly PlatformInterest[];
  readonly productUpdateConsent: true;
  readonly sourcePage: '/products/waitlist';
  readonly createdAt: string;
}
type WaitlistFormResult =
  | {
      readonly ok: true;
      readonly submission: WaitlistFormSubmission;
    }
  | {
      readonly ok: false;
      readonly message: string;
    };
const errorFallbackMessage =
  'The waitlist request could not be sent. Please try again.';

function getCheckedValues<T extends string>(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .filter((value): value is T => typeof value === 'string');
}

function readWaitlistFormSubmission(form: HTMLFormElement): WaitlistFormResult {
  const formData = new FormData(form);
  const emailValue = formData.get('email');
  const email = typeof emailValue === 'string' ? emailValue.trim() : '';
  const productInterests = getCheckedValues<ProductInterest>(
    formData,
    'productInterests',
  );
  const platformInterests = getCheckedValues<PlatformInterest>(
    formData,
    'platformInterests',
  );

  if (formData.get('productUpdateConsent') !== 'true') {
    return {
      ok: false,
      message: 'Consent for occasional Unwired product updates is required.',
    };
  }

  return {
    ok: true,
    submission: {
      email,
      productInterests,
      platformInterests,
      productUpdateConsent: true,
      sourcePage: '/products/waitlist',
      createdAt: new Date().toISOString(),
    },
  };
}

function ProductInterestFields() {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium">Product interest</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {productOptions.map((option) => (
          <label
            className="border-border bg-background/80 has-checked:border-foreground flex min-h-28 cursor-pointer flex-col gap-2 rounded-lg border p-4 transition"
            key={option.value}>
            <input
              aria-label={option.label}
              className="size-4 accent-current"
              name="productInterests"
              type="checkbox"
              value={option.value}
            />
            <span className="font-medium">{option.label}</span>
            <span className="text-muted-foreground text-sm leading-6">
              {option.description}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PlatformInterestFields() {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium">Platform interest</legend>
      <div className="flex flex-wrap gap-3">
        {platformOptions.map((option) => (
          <label
            className="border-border bg-background/80 has-checked:border-foreground flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition"
            key={option.value}>
            <input
              aria-label={option.label}
              className="size-4 accent-current"
              name="platformInterests"
              type="checkbox"
              value={option.value}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function WaitlistStatusMessage({
  message,
  status,
}: {
  readonly message: string | null;
  readonly status: SubmissionStatus;
}) {
  return (
    <p
      aria-live="polite"
      className={cn(
        'min-h-6 text-sm leading-6',
        status === 'success' ? 'text-foreground' : 'text-muted-foreground',
        status === 'error' ? 'text-destructive' : null,
      )}>
      {message}
    </p>
  );
}

export function ProductWaitlistForm() {
  const trpc = useTRPC();
  const joinWaitlist = useMutation(trpc.waitlist.join.mutationOptions());
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  function submitWaitlist(form: HTMLFormElement) {
    const submissionResult = readWaitlistFormSubmission(form);

    setStatus('submitting');
    setMessage(null);

    if (!submissionResult.ok) {
      setStatus('error');
      setMessage(submissionResult.message);
      return;
    }

    joinWaitlist.mutate(submissionResult.submission, {
      onSuccess: (response) => {
        setStatus('success');
        setMessage(response.message);
        form.reset();
      },
      onError: (error) => {
        setStatus('error');
        setMessage(error.message || errorFallbackMessage);
      },
    });
  }

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault();
    submitWaitlist(event.currentTarget);
  };

  const isSubmitting = status === 'submitting' || joinWaitlist.isPending;

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-medium"
          htmlFor="waitlist-email">
          Email address
        </label>
        <input
          required
          aria-label="Email address"
          autoComplete="email"
          className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-11 rounded-lg border px-3 text-base transition outline-none focus-visible:ring-3"
          id="waitlist-email"
          name="email"
          type="email"
        />
      </div>

      <ProductInterestFields />

      <PlatformInterestFields />

      <label className="flex gap-3 text-sm leading-6">
        <input
          required
          aria-label="Consent for occasional Unwired product updates"
          className="mt-1 size-4 shrink-0 accent-current"
          name="productUpdateConsent"
          type="checkbox"
          value="true"
        />
        <span>
          I agree to receive occasional Unwired product updates. Updates may
          cover both Unwired Mail and Unwired Calendar by default.
        </span>
      </label>

      <div className="flex flex-col gap-4">
        <button
          className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-fit')}
          disabled={isSubmitting}
          type="submit">
          {isSubmitting ? 'Joining waitlist...' : 'Join product waitlist'}
        </button>

        <WaitlistStatusMessage
          message={message}
          status={status}
        />
      </div>
    </form>
  );
}
