const productInterestValues = ['unwired-mail', 'unwired-calendar'] as const;
const platformInterestValues = ['macos', 'ios', 'ipados'] as const;

export type ProductInterest = (typeof productInterestValues)[number];
export type PlatformInterest = (typeof platformInterestValues)[number];

export type WaitlistSubmission = {
  readonly email: string;
  readonly productInterests: readonly ProductInterest[];
  readonly platformInterests: readonly PlatformInterest[];
  readonly productUpdateConsent: true;
  readonly sourcePage: string;
  readonly createdAt: string;
};

type ValidationResult =
  | {
      readonly ok: true;
      readonly submission: WaitlistSubmission;
    }
  | {
      readonly ok: false;
      readonly errors: readonly string[];
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWaitlistSubmission(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isRecord(input)) {
    return { ok: false, errors: ['Request body must be a JSON object.'] };
  }

  const email = input.email;
  const productInterests = input.productInterests;
  const platformInterests = input.platformInterests;
  const productUpdateConsent = input.productUpdateConsent;
  const sourcePage = input.sourcePage;
  const createdAt = input.createdAt;

  if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
    errors.push('Email address is required.');
  }

  const normalizedProducts = validateEnumArray(
    productInterests,
    productInterestValues,
    'Product interest must include Unwired Mail, Unwired Calendar, or both.',
  );
  if (!normalizedProducts.ok) {
    errors.push(normalizedProducts.error);
  }

  const normalizedPlatforms = validateEnumArray(
    platformInterests,
    platformInterestValues,
    'Platform interest must include macOS, iOS, or iPadOS.',
  );
  if (!normalizedPlatforms.ok) {
    errors.push(normalizedPlatforms.error);
  }

  if (productUpdateConsent !== true) {
    errors.push('Consent for occasional Unwired product updates is required.');
  }

  if (typeof sourcePage !== 'string' || sourcePage.trim().length === 0) {
    errors.push('Source page is required.');
  }

  if (typeof createdAt !== 'string' || Number.isNaN(Date.parse(createdAt))) {
    errors.push('Created timestamp must be a valid ISO date string.');
  }

  if (errors.length > 0 || !normalizedProducts.ok || !normalizedPlatforms.ok) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    submission: {
      email: email.trim().toLowerCase(),
      productInterests: normalizedProducts.values,
      platformInterests: normalizedPlatforms.values,
      productUpdateConsent: true,
      sourcePage: sourcePage.trim(),
      createdAt,
    },
  };
}

function validateEnumArray<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
  error: string,
):
  | {
      readonly ok: true;
      readonly values: readonly T[];
    }
  | {
      readonly ok: false;
      readonly error: string;
    } {
  if (!Array.isArray(value) || value.length === 0) {
    return { ok: false, error };
  }

  const uniqueValues = new Set<T>();

  for (const item of value) {
    if (typeof item !== 'string' || !allowedValues.includes(item as T)) {
      return { ok: false, error };
    }

    uniqueValues.add(item as T);
  }

  return { ok: true, values: [...uniqueValues] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
