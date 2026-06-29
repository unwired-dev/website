import { cn } from '@unwired/ui/lib/utils';

type ProductKind = 'calendar' | 'mail';

const mailThreads = [
  { width: '76%', offset: '0%' },
  { width: '58%', offset: '14%' },
  { width: '83%', offset: '5%' },
  { width: '48%', offset: '25%' },
];

const calendarDays = Array.from({ length: 21 }, (_, index) => index + 1);

export function ProductVisual({
  className,
  kind,
}: {
  readonly className?: string;
  readonly kind: ProductKind;
}) {
  if (kind === 'mail') {
    return (
      <div
        aria-hidden="true"
        className={cn('product-visual product-visual--mail', className)}>
        <div className="product-visual__index">01</div>
        <div className="mail-orbit" />
        <div className="mail-thread-list">
          {mailThreads.map((thread, index) => (
            <div
              className="mail-thread"
              key={thread.width}
              style={{
                marginInlineStart: thread.offset,
                width: thread.width,
              }}>
              <span className="mail-thread__dot" />
              <span className="mail-thread__line" />
              <span className="mail-thread__number">0{index + 1}</span>
            </div>
          ))}
        </div>
        <p className="product-visual__caption">Context stays close.</p>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn('product-visual product-visual--calendar', className)}>
      <div className="product-visual__index">02</div>
      <div className="calendar-field">
        {calendarDays.map((day) => (
          <span
            className={cn(
              'calendar-day',
              [5, 12, 18].includes(day) ? 'calendar-day--marked' : null,
            )}
            key={day}>
            {day.toString().padStart(2, '0')}
          </span>
        ))}
      </div>
      <div className="calendar-sweep" />
      <p className="product-visual__caption">Time, with memory.</p>
    </div>
  );
}

export function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 16 16">
      <path
        d="M4 12 12 4m0 0H5.5M12 4v6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}
