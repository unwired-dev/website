'use client';

import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import { useEffect, useRef, useState } from 'react';

const bookingUrl = 'https://cal.eu/jan-silhan-unwired/frontend-consultation';
const fallbackEmail = 'silhan@unwired.dev';
const focusableSelector =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

function getFocusableElements(dialog: HTMLDialogElement | null) {
  return [...(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])];
}

function getFocusBoundaries(dialog: HTMLDialogElement) {
  const focusableElements = getFocusableElements(dialog);
  const [firstElement] = focusableElements;
  const lastElement = focusableElements.at(-1);

  if (!firstElement || !lastElement) {
    return null;
  }

  return { firstElement, lastElement };
}

function shouldMoveFocusToEnd(
  event: KeyboardEvent,
  dialog: HTMLDialogElement,
  firstElement: HTMLElement,
) {
  if (!event.shiftKey) {
    return false;
  }

  return (
    document.activeElement === firstElement ||
    !dialog.contains(document.activeElement)
  );
}

function shouldMoveFocusToStart(
  event: KeyboardEvent,
  lastElement: HTMLElement,
) {
  return !event.shiftKey && document.activeElement === lastElement;
}

function moveFocusInsideDialog(
  event: KeyboardEvent,
  dialog: HTMLDialogElement,
  boundaries: {
    firstElement: HTMLElement;
    lastElement: HTMLElement;
  },
) {
  const { firstElement, lastElement } = boundaries;

  if (shouldMoveFocusToEnd(event, dialog, firstElement)) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (shouldMoveFocusToStart(event, lastElement)) {
    event.preventDefault();
    firstElement.focus();
  }
}

function keepFocusInsideDialog(
  event: KeyboardEvent,
  dialog: HTMLDialogElement | null,
) {
  if (!dialog) {
    return;
  }

  const boundaries = getFocusBoundaries(dialog);

  if (!boundaries) {
    return;
  }

  moveFocusInsideDialog(event, dialog, boundaries);
}

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      keepFocusInsideDialog(event, dialogRef.current);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-6')}
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}>
        Book a frontend consultation
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close booking modal"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <dialog
            ref={dialogRef}
            open
            aria-labelledby="booking-modal-title"
            aria-modal="true"
            className="bg-background text-foreground relative m-0 flex h-[min(760px,calc(100vh-2rem))] w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10"
            onCancel={(event) => {
              event.preventDefault();
              setIsOpen(false);
            }}>
            <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-2">
                <h2
                  className="text-xl font-semibold tracking-[-0.03em]"
                  id="booking-modal-title">
                  Book a frontend consultation
                </h2>
                <p className="text-muted-foreground max-w-2xl text-sm leading-6">
                  Pick a time through Cal.com, or email directly if the embed is
                  not convenient.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'self-start',
                )}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                }}>
                Close
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-white">
              {/* oxlint-disable-next-line react/iframe-missing-sandbox -- Cal.com returns a 500 error when loaded in a sandboxed iframe. */}
              <iframe
                className="h-full w-full border-0"
                loading="lazy"
                src={bookingUrl}
                title="Cal.com scheduler for frontend consultation"
              />
            </div>

            <div className="flex flex-col gap-3 border-t p-5 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground leading-6">
                Prefer email instead?
              </p>
              <a
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'w-full sm:w-auto',
                )}
                href={`mailto:${fallbackEmail}`}>
                Email {fallbackEmail}
              </a>
            </div>
          </dialog>
        </div>
      ) : null}
    </>
  );
}
