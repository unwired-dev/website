import { cn } from '@unwired/ui/lib/utils';

import {
  eyebrow,
  pageGrid,
  reveal,
  sectionHeading,
} from '@/components/marketing-styles';
import { privacyContactEmail } from '@/lib/site';

export const legalDocumentLink =
  'text-foreground underline decoration-[var(--signal)] decoration-1 underline-offset-[0.24em] transition-colors duration-[160ms] ease-[var(--ease-out-quart)] hover:text-[var(--signal)]';

interface LegalDocumentHeaderProps {
  readonly contactLabel: string;
  readonly documentNumber: string;
  readonly entityLabel: string;
  readonly lead: string;
  readonly status: string;
  readonly summary: string;
  readonly title: string;
}

export function LegalDocumentHeader({
  contactLabel,
  documentNumber,
  entityLabel,
  lead,
  status,
  summary,
  title,
}: LegalDocumentHeaderProps) {
  return (
    <section
      className={cn(pageGrid, reveal, 'gap-y-16 py-[clamp(4rem,10vw,9rem)]')}>
      <div className="col-span-full flex flex-col gap-6 md:col-start-1 md:col-end-9">
        <p className={eyebrow}>
          <span>{documentNumber}</span>
          Legal
        </p>
        <h1 className={cn(sectionHeading, 'max-w-[11ch]')}>{title}</h1>
        <div className="grid max-w-[46rem] gap-3">
          <p className="font-heading text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.05] font-[540] tracking-[-0.04em]">
            {lead}
          </p>
          <p className="text-muted-foreground text-[1.15rem] leading-[1.7]">
            {summary}
          </p>
        </div>
      </div>

      <dl className="border-border md:[&>div+div]:border-border col-span-full grid border-y md:col-start-1 md:col-end-13 md:grid-cols-3 [&>div]:grid [&>div]:gap-2 [&>div]:py-5 md:[&>div]:px-6 md:[&>div+div]:border-l md:[&>div:first-child]:pl-0">
        <div>
          <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
            {entityLabel}
          </dt>
          <dd className="font-[650]">Unwired, s.r.o.</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
            {contactLabel}
          </dt>
          <dd>
            <a
              className={legalDocumentLink}
              href={`mailto:${privacyContactEmail}`}>
              {privacyContactEmail}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
            Status
          </dt>
          <dd>{status}</dd>
        </div>
      </dl>
    </section>
  );
}
