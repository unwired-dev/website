const productInterestValues = ['unwired-mail', 'unwired-calendar'] as const;
const platformInterestValues = ['macos', 'ios', 'ipados'] as const;

export type ProductInterest = (typeof productInterestValues)[number];
export type PlatformInterest = (typeof platformInterestValues)[number];

export interface WaitlistSubmission {
  readonly email: string;
  readonly productInterests: readonly ProductInterest[];
  readonly platformInterests: readonly PlatformInterest[];
  readonly productUpdateConsent: true;
  readonly sourcePage: string;
  readonly createdAt: string;
}

type ValidationResult =
  | {
      readonly ok: true;
      readonly submission: WaitlistSubmission;
    }
  | {
      readonly ok: false;
      readonly errors: readonly string[];
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

function isProductInterest(value: string): value is ProductInterest {
  return value === 'unwired-mail' || value === 'unwired-calendar';
}

function isPlatformInterest(value: string): value is PlatformInterest {
  return value === 'macos' || value === 'ios' || value === 'ipados';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateEnumArray<T extends string>(
  value: unknown,
  isAllowedValue: (value: string) => value is T,
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
    if (typeof item !== 'string' || !isAllowedValue(item)) {
      return { ok: false, error };
    }

    uniqueValues.add(item);
  }

  return { ok: true, values: [...uniqueValues] };
}

export function validateWaitlistSubmission(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isRecord(input)) {
    return { ok: false, errors: ['Request body must be a JSON object.'] };
  }

  const {
    email,
    productInterests,
    platformInterests,
    productUpdateConsent,
    sourcePage,
    createdAt,
  } = input;

  const normalizedEmail =
    typeof email === 'string' && emailPattern.test(email.trim())
      ? email.trim().toLowerCase()
      : undefined;
  if (!normalizedEmail) {
    errors.push('Email address is required.');
  }

  const normalizedProducts = validateEnumArray(
    productInterests,
    isProductInterest,
    'Product interest must include Unwired Mail, Unwired Calendar, or both.',
  );
  if (!normalizedProducts.ok) {
    errors.push(normalizedProducts.error);
  }

  const normalizedPlatforms = validateEnumArray(
    platformInterests,
    isPlatformInterest,
    'Platform interest must include macOS, iOS, or iPadOS.',
  );
  if (!normalizedPlatforms.ok) {
    errors.push(normalizedPlatforms.error);
  }

  if (productUpdateConsent !== true) {
    errors.push('Consent for occasional Unwired product updates is required.');
  }

  const normalizedSourcePage =
    typeof sourcePage === 'string' && sourcePage.trim().length > 0
      ? sourcePage.trim()
      : undefined;
  if (!normalizedSourcePage) {
    errors.push('Source page is required.');
  }

  const normalizedCreatedAt =
    typeof createdAt === 'string' && !Number.isNaN(Date.parse(createdAt))
      ? createdAt
      : undefined;
  if (!normalizedCreatedAt) {
    errors.push('Created timestamp must be a valid ISO date string.');
  }

  if (
    errors.length > 0 ||
    !normalizedProducts.ok ||
    !normalizedPlatforms.ok ||
    !normalizedEmail ||
    !normalizedSourcePage ||
    !normalizedCreatedAt
  ) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    submission: {
      email: normalizedEmail,
      productInterests: normalizedProducts.values,
      platformInterests: normalizedPlatforms.values,
      productUpdateConsent: true,
      sourcePage: normalizedSourcePage,
      createdAt: normalizedCreatedAt,
    },
  };
}
