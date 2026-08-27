import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import {
  LegalDocumentHeader,
  legalDocumentLink,
} from '@/components/legal-document-header';
import { pageGrid } from '@/components/marketing-styles';
import { privacyContactEmail, withdrawalMailto } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'How Unwired, s.r.o. handles Company Website data.',
  alternates: {
    canonical: '/privacy',
  },
};

const privacySections = [
  { href: '#website-access', label: 'Website access' },
  { href: '#theme-preference', label: 'Theme preference' },
  { href: '#product-waitlist', label: 'Product waitlist' },
  { href: '#consultation-bookings', label: 'Consultation bookings' },
  { href: '#service-providers', label: 'Service providers' },
  { href: '#your-rights', label: 'Your rights' },
] as const;

interface PrivacySectionProps {
  readonly children: ReactNode;
  readonly id: string;
  readonly index: string;
  readonly title: string;
}

function PrivacySection({ children, id, index, title }: PrivacySectionProps) {
  return (
    <section
      className="border-border grid scroll-mt-8 gap-5 border-t py-10 md:grid-cols-[4rem_1fr] md:gap-8"
      id={id}>
      <p className="text-[0.7rem] font-[650] tracking-[0.14em] text-[var(--signal)] tabular-nums">
        {index}
      </p>
      <div className="max-w-[48rem]">
        <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] leading-[1] font-[580] tracking-[-0.045em]">
          {title}
        </h2>
        <div className="text-muted-foreground [&_h3]:font-heading [&_h3]:text-foreground mt-6 grid gap-5 leading-[1.75] [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-[650] [&_h3]:tracking-[-0.02em] [&_li]:pl-2 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main
      className="flex-1"
      id="main-content">
      <LegalDocumentHeader
        contactLabel="Privacy contact"
        documentNumber="05"
        entityLabel="Controller"
        lead="What Unwired knows and why."
        status="Provisional · 27 August 2026"
        summary="A plain-language register of the data Unwired uses to run the Company Website."
        title="Privacy Notice"
      />

      <div
        className={cn(
          pageGrid,
          'gap-y-12 border-t border-border py-[clamp(4rem,9vw,8rem)]',
        )}>
        <aside className="col-span-full self-start md:sticky md:top-8 md:col-start-1 md:col-end-4">
          <p className="text-xs font-[650] tracking-[0.14em] text-[var(--signal)] uppercase">
            Data register
          </p>
          <nav
            aria-label="Privacy Notice sections"
            className="border-border mt-5 flex flex-col border-t">
            {privacySections.map((section, index) => (
              <a
                className="text-muted-foreground hover:text-foreground border-border grid min-h-11 grid-cols-[2rem_1fr] items-center border-b text-sm transition-colors duration-[160ms] ease-[var(--ease-out-quart)]"
                href={section.href}
                key={section.href}>
                <span className="text-[0.65rem] text-[var(--signal)] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="col-span-full md:col-start-5 md:col-end-13">
          <section className="pb-10">
            <h2 className="font-heading text-[clamp(2rem,5vw,3.7rem)] leading-[0.98] font-[580] tracking-[-0.05em]">
              Who is responsible
            </h2>
            <div className="text-muted-foreground mt-6 grid max-w-[48rem] gap-2 leading-[1.75]">
              <p>Unwired, s.r.o.</p>
              <p>Soběšická 184/36, Husovice, 614 00 Brno, Czech Republic</p>
              <p>IČO 19711131 · DIČ CZ19711131</p>
              <p>
                Registered in the Commercial Register maintained by the Regional
                Court in Brno, section C, file 135646.
              </p>
              <p className="mt-3">
                Questions and privacy requests can be sent to{' '}
                <a
                  className={legalDocumentLink}
                  href={`mailto:${privacyContactEmail}`}>
                  {privacyContactEmail}
                </a>
                .
              </p>
            </div>
          </section>

          <PrivacySection
            id="website-access"
            index="01"
            title="Website access">
            <p>
              When you visit the site, Vercel processes technical request data
              such as your IP address, requested URL, request time, and browser
              or device information. Unwired uses this data to deliver the
              website, maintain security, prevent abuse, and troubleshoot
              faults.
            </p>
            <p>
              The legal basis is Unwired&apos;s legitimate interest in operating
              a reliable and secure public website. Technical records are kept
              only for the periods made available or configured by Vercel and no
              longer than needed for security and troubleshooting.
            </p>
          </PrivacySection>

          <PrivacySection
            id="theme-preference"
            index="02"
            title="Theme preference">
            <p>
              If you change the site theme, the value{' '}
              <code className="text-foreground text-[0.92em]">
                unwired-theme
              </code>{' '}
              stores only your light or dark preference in your browser&apos;s
              local storage. It is not sent to Unwired and remains until you
              change it or clear browser storage.
            </p>
            <p>
              This visitor-requested storage is used only to remember the
              interface setting. The site does not use analytics, advertising
              trackers, fingerprinting, or other nonessential browser storage,
              so it does not display a cookie-consent banner.
            </p>
          </PrivacySection>

          <PrivacySection
            id="product-waitlist"
            index="03"
            title="Product waitlist">
            <p>
              The Product Waitlist collects your email address, interest in
              Unwired Mail and Unwired Calendar, platform interests, the source
              page, the submission time, and a record of your consent.
            </p>
            <p>
              Unwired uses this information to confirm your place and send
              occasional updates about Unwired Mail and Unwired Calendar. It is
              not used for consultancy promotions, unrelated products, or
              third-party marketing. The legal basis is your consent. Providing
              the data is voluntary, but Unwired cannot add you to the waitlist
              without it.
            </p>
            <p>
              The intended retention rule is to keep this data until you
              withdraw consent or the relevant waitlist closes, then delete it
              within 30 days except for the minimum record needed to demonstrate
              consent or withdrawal. This rule will take effect only after the
              provider-aware deletion and suppression process is operational.
            </p>
            <p>
              Withdraw at any time using this{' '}
              <a
                className={legalDocumentLink}
                href={withdrawalMailto}>
                pre-addressed email
              </a>
              . Withdrawal does not affect processing that was lawful before it.
            </p>
          </PrivacySection>

          <PrivacySection
            id="consultation-bookings"
            index="04"
            title="Consultation bookings">
            <p>
              Consultation links open Cal.eu, an EU-hosted scheduling service.
              The booking form collects your name, email address, selected time
              and timezone, and meeting metadata. Optional fields can include
              notes and guest email addresses. Google Workspace provides the
              calendar and Google Meet details.
            </p>
            <p>
              Unwired uses this data only to schedule, prepare for, and follow
              up on the consultation you requested and, if you engage Unwired,
              to manage the client relationship. The legal bases are steps
              requested before entering a contract and Unwired&apos;s legitimate
              interest in responding to genuine business enquiries.
            </p>
            <p>
              Unsuccessful booking records are deleted 12 months after the last
              relevant contact. Records that become part of a client engagement
              are kept for applicable contractual, accounting, and legal
              periods.
            </p>
            <p>
              Do not place confidential information, special-category personal
              data, or other sensitive personal data in the optional booking
              notes.
            </p>
          </PrivacySection>

          <PrivacySection
            id="service-providers"
            index="05"
            title="Service providers and transfers">
            <p>Unwired uses these providers only for the stated purposes:</p>
            <ul>
              <li>
                <strong className="text-foreground">Vercel</strong> for hosting,
                request handling, and security logs. The Product Waitlist
                function runs in Frankfurt.
              </li>
              <li>
                <strong className="text-foreground">Resend</strong> for Product
                Waitlist confirmation and notification email.
              </li>
              <li>
                <strong className="text-foreground">Google Workspace</strong>{' '}
                for internal email, calendar, and Google Meet.
              </li>
              <li>
                <strong className="text-foreground">Cal.eu</strong> for
                EU-hosted consultation scheduling.
              </li>
            </ul>
            <p>
              Vercel, Resend, Google Workspace, and Cal.eu can process data
              outside the European Economic Area. Unwired is confirming the
              provider-specific transfer arrangements and safeguards. This
              Notice will remain provisional until those details are confirmed
              and published here.
            </p>
            <p>
              Unwired does not sell personal data. Data is disclosed to public
              authorities only where legally required.
            </p>
          </PrivacySection>

          <PrivacySection
            id="your-rights"
            index="06"
            title="Your rights">
            <p>
              Depending on the circumstances, you may ask Unwired for access,
              correction, deletion, restriction, or portability of your personal
              data. You may object to processing based on legitimate interests
              and withdraw consent at any time.
            </p>
            <p>
              Email{' '}
              <a
                className={legalDocumentLink}
                href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>{' '}
              to exercise a right. Unwired may need enough information to verify
              your identity before responding.
            </p>
            <p>
              You can also complain to the{' '}
              <a
                className={legalDocumentLink}
                href="https://uoou.gov.cz/"
                rel="noreferrer"
                target="_blank">
                Czech Office for Personal Data Protection
              </a>
              . Unwired does not use Company Website data for automated
              decision-making or profiling.
            </p>
          </PrivacySection>

          <section className="border-border border-t pt-10">
            <h2 className="font-heading text-2xl font-[580] tracking-[-0.035em]">
              Changes to this notice
            </h2>
            <p className="text-muted-foreground mt-4 max-w-[48rem] leading-[1.75]">
              Unwired will update this page and its status date when Company
              Website data practices materially change. Adding analytics,
              advertising, third-party embeds, nonessential browser storage, or
              Product processing requires a new privacy and consent review
              before activation.
            </p>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                className={legalDocumentLink}
                href="/terms">
                Read the Terms of Use
              </Link>
              <Link
                className={legalDocumentLink}
                href="/">
                Return to Unwired
              </Link>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
