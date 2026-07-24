import Link from 'next/link';

export function BookingPrivacyNote() {
  return (
    <p className="text-muted-foreground max-w-sm text-xs leading-[1.6]">
      Booking is handled by Cal.eu.{' '}
      <Link
        className="hover:text-foreground underline decoration-[color-mix(in_oklch,var(--muted-foreground),transparent_45%)] underline-offset-[0.22em] transition-colors duration-[160ms] ease-[var(--ease-out-quart)]"
        href="/privacy">
        See Privacy Notice.
      </Link>
    </p>
  );
}
