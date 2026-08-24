import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import {
  eyebrow,
  pageGrid,
  reveal,
  sectionHeading,
} from '@/components/marketing-styles';
import { privacyContactEmail, withdrawalMailto } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'How Unwired, s.r.o. handles Company Website and Product data.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    follow: false,
    index: false,
  },
};

const legalLink =
  'text-foreground underline decoration-[var(--signal)] decoration-1 underline-offset-[0.24em] transition-colors duration-[160ms] ease-[var(--ease-out-quart)] hover:text-[var(--signal)]';

const privacySections = [
  { href: '#website-access', label: 'Website access' },
  { href: '#theme-preference', label: 'Theme preference' },
  { href: '#product-waitlist', label: 'Product waitlist' },
  { href: '#consultation-bookings', label: 'Consultation bookings' },
  { href: '#product-accounts', label: 'Product Accounts' },
  { href: '#product-sync', label: 'Product Sync' },
  { href: '#mailbox-connections', label: 'Mailbox Connections' },
  { href: '#push-notifications', label: 'Push notifications' },
  { href: '#ai-assistance', label: 'AI assistance' },
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
      <section
        className={cn(pageGrid, reveal, 'gap-y-16 py-[clamp(4rem,10vw,9rem)]')}>
        <div className="col-span-full flex flex-col gap-6 md:col-start-1 md:col-end-9">
          <p className={eyebrow}>
            <span>05</span>
            Legal
          </p>
          <h1 className={cn(sectionHeading, 'max-w-[11ch]')}>Privacy Notice</h1>
          <div className="grid max-w-[42rem] gap-3">
            <p className="font-heading text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.05] font-[540] tracking-[-0.04em]">
              What Unwired knows and why.
            </p>
            <p className="text-muted-foreground text-[1.15rem] leading-[1.7]">
              A plain-language register of the data Unwired uses to run the
              Company Website and Products.
            </p>
          </div>
        </div>

        <div className="col-span-full md:col-start-1 md:col-end-10">
          <div
            className="grid gap-3 border-l-2 border-[var(--signal)] bg-[color-mix(in_oklch,var(--signal),transparent_92%)] px-5 py-4"
            role="note">
            <p className="font-[650] text-[var(--signal)]">
              Draft for legal review
            </p>
            <p className="text-muted-foreground leading-[1.65]">
              The Product disclosures in this combined notice are provisional.
              Unwired must complete legal review and confirm production service
              providers, hosting regions, transfer safeguards, and retention
              criteria before this draft takes effect.
            </p>
          </div>
        </div>

        <dl className="border-border md:[&>div+div]:border-border col-span-full grid border-y md:col-start-1 md:col-end-13 md:grid-cols-3 [&>div]:grid [&>div]:gap-2 [&>div]:py-5 md:[&>div]:px-6 md:[&>div+div]:border-l md:[&>div:first-child]:pl-0">
          <div>
            <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
              Controller
            </dt>
            <dd className="font-[650]">Unwired, s.r.o.</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
              Privacy contact
            </dt>
            <dd>
              <a
                className={legalLink}
                href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
              Status
            </dt>
            <dd>Provisional draft · 24 August 2026</dd>
          </div>
        </dl>
      </section>

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
                  className={legalLink}
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
              Data is kept until you withdraw consent or the relevant waitlist
              closes. It is then deleted within 30 days, except for the minimum
              record needed to demonstrate consent or withdrawal.
            </p>
            <p>
              Withdraw at any time using this{' '}
              <a
                className={legalLink}
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
            id="product-accounts"
            index="05"
            title="Product Accounts and sign-in">
            <p>
              Unwired Products use a Product Account to identify you and your
              Trusted Devices. Sign in with Apple supplies an account token that
              lets Unwired create or resume the same Product Account. Unwired
              does not receive your Apple password.
            </p>
            <p>
              Unwired processes the Product Account identifier, Trusted Device
              identifiers and names, device platform and last-seen time,
              credential digests, and security state. This Operational Account
              Data is needed to provide account access, secure the Products,
              route Product operations, and prevent abuse. The legal bases are
              performance of the Product agreement and Unwired&apos;s legitimate
              interest in protecting accounts and services.
            </p>
            <p>
              Active Product Account data is kept while the account exists.
              Account deletion removes active account records, subject to
              narrowly necessary legal, security, backup, and technical
              convergence records. Unwired must confirm the production retention
              criteria for those residual records before this draft takes
              effect.
            </p>
            <p>
              The Products are not directed at children. Product users must be
              at least 16 and have any permission from a parent or guardian that
              the law where they live requires.
            </p>
          </PrivacySection>

          <PrivacySection
            id="product-sync"
            index="06"
            title="Trusted Devices and Product Sync">
            <p>
              Product Sync transfers Product-owned settings and state between
              Trusted Devices using end-to-end encryption. Unwired&apos;s
              backend stores opaque ciphertext and the routing information
              needed to deliver it. Unwired cannot decrypt Product Sync without
              the Recovery Key held by you or your Trusted Devices.
            </p>
            <p>
              Unwired processes encrypted Product Sync data to provide the sync
              function you request. It remains while the Product Account exists
              and is removed from active systems when the account is deleted,
              subject to the residual-record criteria described above.
            </p>
            <p>
              Revoking a Trusted Device or deleting a Product Account cannot
              guarantee erasure from a device that is offline or compromised.
              Reachable devices receive a request to purge local Product data
              and credentials when they reconnect.
            </p>
          </PrivacySection>

          <PrivacySection
            id="mailbox-connections"
            index="07"
            title="Mailbox Connections">
            <p>
              A Mailbox Connection lets a Trusted Device access a mailbox you
              choose through Google, Microsoft, Exchange Web Services, or a
              standards-based IMAP and SMTP provider. You authorize each Mailbox
              Connection on each Trusted Device independently.
            </p>
            <p>
              Provider credentials and access tokens remain on the Trusted
              Device. Mail, attachments, contacts, and calendar information are
              processed locally when a Product performs the actions you request.
              Drafts and attachments are transmitted to your chosen Mail
              Provider when you send or save them there. Product-owned records
              included in Product Sync remain end-to-end encrypted.
            </p>
            <p>
              The legal basis is performance of the Product agreement. Your Mail
              Provider remains responsible for the mailbox it hosts and applies
              its own privacy terms. Deleting a Product Account does not delete
              provider mail or necessarily revoke authorization issued by the
              provider.
            </p>
          </PrivacySection>

          <PrivacySection
            id="push-notifications"
            index="08"
            title="Push notifications">
            <p>
              When notifications or scheduled Product operations are enabled,
              Unwired processes Apple Push Notification service tokens, device
              routes, provider-verification metadata, and limited operational
              records needed to deliver or verify the requested operation. Push
              payloads are kept to the minimum needed for routing.
            </p>
            <p>
              The legal bases are performance of the Product agreement and
              Unwired&apos;s legitimate interest in secure, reliable delivery.
              These records remain only while the device, route, or scheduled
              operation needs them, subject to narrowly necessary security and
              technical convergence records.
            </p>
          </PrivacySection>

          <PrivacySection
            id="ai-assistance"
            index="09"
            title="On-device AI assistance">
            <p>
              Optional AI assistance uses supported Apple models on your device.
              The relevant local mail context and generated preview are not sent
              to Unwired or to an Unwired cloud model. A preview is temporary
              unless you accept it, at which point it becomes content you chose
              to save, send, or synchronize.
            </p>
            <p>
              AI assistance is off by default and requires an explicit action.
              Unwired does not use Product data for automated decisions about
              you or for profiling. Verify generated output against the linked
              source material before using it.
            </p>
          </PrivacySection>

          <PrivacySection
            id="service-providers"
            index="10"
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
              <li>
                <strong className="text-foreground">Convex</strong> for Product
                Account operations, Trusted Device routing, push coordination,
                and storage of end-to-end encrypted Product Sync data.
              </li>
              <li>
                <strong className="text-foreground">Apple</strong> for Sign in
                with Apple, push delivery, and supported device services.
              </li>
              <li>
                <strong className="text-foreground">
                  Your chosen Mail Providers
                </strong>{' '}
                for mailbox operations you request. These can include Google,
                Microsoft, an organization&apos;s Exchange server, or an IMAP
                and SMTP provider, each acting under its own privacy terms.
              </li>
            </ul>
            <p>
              Vercel, Resend, and Google may process data outside the European
              Economic Area. Where no adequacy decision applies, the providers
              use safeguards such as the European Commission&apos;s Standard
              Contractual Clauses. Resend stores account metadata, logs, and API
              records in the United States for its standard service.
            </p>
            <p>
              Before this draft takes effect, Unwired must confirm the
              production Convex deployment location, the role of each Product
              recipient, and the transfer safeguard used wherever an adequacy
              decision does not apply.
            </p>
            <p>
              Unwired does not sell personal data. Data is disclosed to public
              authorities only where legally required.
            </p>
          </PrivacySection>

          <PrivacySection
            id="your-rights"
            index="11"
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
                className={legalLink}
                href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>{' '}
              to exercise a right. Unwired may need enough information to verify
              your identity before responding.
            </p>
            <p>
              You can also complain to the{' '}
              <a
                className={legalLink}
                href="https://uoou.gov.cz/"
                rel="noreferrer"
                target="_blank">
                Czech Office for Personal Data Protection
              </a>
              . Unwired does not use Company Website or Product data for
              automated decision-making or profiling.
            </p>
            <p>
              Product Account information is required to create and operate an
              account. Without it, Unwired cannot provide account-backed Product
              functions. Push notifications and AI assistance are optional. Mail
              and related content obtained from a Mail Provider comes from the
              account you choose to connect and is processed only for the
              Product operations you request.
            </p>
          </PrivacySection>

          <section className="border-border border-t pt-10">
            <h2 className="font-heading text-2xl font-[580] tracking-[-0.035em]">
              Changes to this notice
            </h2>
            <p className="text-muted-foreground mt-4 max-w-[48rem] leading-[1.75]">
              Unwired will update this page and its effective date when the
              Company Website or Product data practices materially change.
              Adding analytics, advertising, third-party embeds, nonessential
              browser storage, or new Product processing requires a new privacy
              and consent review before activation.
            </p>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                className={legalLink}
                href="/terms">
                Read the Terms of Use
              </Link>
              <Link
                className={legalLink}
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
