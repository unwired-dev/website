'use client';

import type { ComponentProps } from 'react';

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import { useState } from 'react';

import { ctaButton } from '@/components/marketing-styles';
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
type CheckboxBlurHandler = NonNullable<ComponentProps<'input'>['onBlur']>;
interface WaitlistFormValues {
  readonly email: string;
  readonly productInterests: readonly ProductInterest[];
  readonly platformInterests: readonly PlatformInterest[];
  readonly productUpdateConsent: boolean;
}
const errorFallbackMessage =
  'The waitlist request could not be sent. Please try again.';
const defaultFormValues: WaitlistFormValues = {
  email: '',
  productInterests: [],
  platformInterests: [],
  productUpdateConsent: false,
};

function toggleArrayValue<T extends string>(
  values: readonly T[],
  value: T,
  checked: boolean,
) {
  if (checked) {
    return values.includes(value) ? values : [...values, value];
  }

  return values.filter((item) => item !== value);
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

function MultiSelectCheckbox<T extends string>({
  label,
  name,
  onBlur,
  onChange,
  selectedValues,
  value,
}: {
  readonly label: string;
  readonly name: string;
  readonly onBlur: CheckboxBlurHandler;
  readonly onChange: (values: readonly T[]) => void;
  readonly selectedValues: readonly T[];
  readonly value: T;
}) {
  return (
    <input
      aria-label={label}
      checked={selectedValues.includes(value)}
      className="size-4 accent-current"
      name={name}
      onBlur={onBlur}
      onChange={(event) => {
        onChange(
          toggleArrayValue(selectedValues, value, event.currentTarget.checked),
        );
      }}
      type="checkbox"
      value={value}
    />
  );
}

export function ProductWaitlistForm() {
  const trpc = useTRPC();
  const joinWaitlist = useMutation(trpc.waitlist.join.mutationOptions());
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: defaultFormValues,
    onSubmit: ({ value }) => {
      setStatus('submitting');
      setMessage(null);

      if (!value.productUpdateConsent) {
        setStatus('error');
        setMessage(
          'Consent for occasional Unwired product updates is required.',
        );
        return;
      }

      joinWaitlist.mutate(
        {
          email: value.email.trim(),
          productInterests: value.productInterests,
          platformInterests: value.platformInterests,
          productUpdateConsent: true,
          sourcePage: '/products/waitlist',
          createdAt: new Date().toISOString(),
        },
        {
          onSuccess: (response) => {
            setStatus('success');
            setMessage(response.message);
            form.reset();
          },
          onError: (error) => {
            setStatus('error');
            setMessage(error.message || errorFallbackMessage);
          },
        },
      );
    },
  });

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault();
    void form.handleSubmit();
  };

  const isSubmitting = status === 'submitting' || joinWaitlist.isPending;

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit}>
      <form.Field name="email">
        {(field) => (
          <div className="flex flex-col gap-3">
            <label
              className="text-foreground mb-3 text-xs font-[650] tracking-[0.08em] uppercase"
              htmlFor="waitlist-email">
              Email address
            </label>
            <input
              required
              aria-label="Email address"
              autoComplete="email"
              className="border-input bg-background text-foreground focus-visible:border-ring min-h-[3.2rem] rounded-[var(--radius)] border px-4 text-base transition-[border-color,box-shadow] duration-[160ms] ease-[var(--ease-out-quart)] outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--ring),transparent_74%)]"
              id="waitlist-email"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => {
                field.handleChange(event.target.value);
              }}
              type="email"
              value={field.state.value}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="productInterests">
        {(field) => (
          <fieldset className="flex flex-col gap-3">
            <legend className="text-foreground mb-3 text-xs font-[650] tracking-[0.08em] uppercase">
              Product interest
            </legend>
            <div className="grid gap-3 md:grid-cols-2">
              {productOptions.map((option) => (
                <label
                  className="border-border bg-background has-focus-visible:outline-ring relative grid min-h-32 cursor-pointer grid-cols-[auto_1fr] gap-x-4 gap-y-2 border p-4 transition-[border-color,background-color] duration-[160ms] ease-[var(--ease-out-quart)] has-checked:border-[var(--signal)] has-checked:bg-[var(--signal-soft)] has-focus-visible:outline-2 has-focus-visible:outline-offset-3 [&_input]:accent-[var(--signal)]"
                  key={option.value}>
                  <MultiSelectCheckbox
                    label={option.label}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    selectedValues={field.state.value}
                    value={option.value}
                  />
                  <span className="font-[650]">{option.label}</span>
                  <span className="text-muted-foreground col-start-2 text-[0.88rem] leading-[1.5]">
                    {option.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </form.Field>

      <form.Field name="platformInterests">
        {(field) => (
          <fieldset className="flex flex-col gap-3">
            <legend className="text-foreground mb-3 text-xs font-[650] tracking-[0.08em] uppercase">
              Platform interest
            </legend>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map((option) => (
                <label
                  className="border-border bg-background has-focus-visible:outline-ring flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 text-[0.88rem] transition-[border-color,background-color] duration-[160ms] ease-[var(--ease-out-quart)] has-checked:border-[var(--signal)] has-checked:bg-[var(--signal-soft)] has-focus-visible:outline-2 has-focus-visible:outline-offset-3 [&_input]:accent-[var(--signal)]"
                  key={option.value}>
                  <MultiSelectCheckbox
                    label={option.label}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    selectedValues={field.state.value}
                    value={option.value}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </form.Field>

      <form.Field name="productUpdateConsent">
        {(field) => (
          <label className="text-muted-foreground has-focus-visible:outline-ring flex cursor-pointer gap-3 text-[0.9rem] leading-[1.6] has-focus-visible:outline-2 has-focus-visible:outline-offset-3">
            <input
              required
              aria-label="Consent for occasional Unwired product updates"
              checked={field.state.value}
              className="mt-1 size-4 shrink-0 accent-[var(--signal)]"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => {
                field.handleChange(event.currentTarget.checked);
              }}
              type="checkbox"
              value="true"
            />
            <span>
              I agree to receive occasional Unwired product updates. Updates may
              cover both Unwired Mail and Unwired Calendar by default.
            </span>
          </label>
        )}
      </form.Field>

      <div className="flex flex-col gap-4">
        <button
          aria-busy={isSubmitting}
          aria-label="Join product waitlist"
          className={cn(
            buttonVariants({ size: 'lg' }),
            ctaButton,
            'w-full sm:w-fit',
          )}
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
