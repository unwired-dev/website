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
import { privacyContactEmail } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing current and future Unwired products.',
  alternates: {
    canonical: '/terms',
  },
};

const legalLink =
  'text-foreground underline decoration-[var(--signal)] decoration-1 underline-offset-[0.24em] transition-colors duration-[160ms] ease-[var(--ease-out-quart)] hover:text-[var(--signal)]';

const termsSections = [
  { href: '#scope', label: 'Scope and acceptance' },
  { href: '#eligibility', label: 'Eligibility and accounts' },
  { href: '#licence', label: 'Product licence' },
  { href: '#content', label: 'Your content' },
  { href: '#ai', label: 'AI assistance' },
  { href: '#acceptable-use', label: 'Acceptable use' },
  { href: '#third-parties', label: 'Third parties' },
  { href: '#changes', label: 'Changes and suspension' },
  { href: '#consumer-rights', label: 'Consumer rights' },
  { href: '#law', label: 'Law and disputes' },
] as const;

interface TermsSectionProps {
  readonly children: ReactNode;
  readonly id: string;
  readonly index: string;
  readonly title: string;
}

function TermsSection({ children, id, index, title }: TermsSectionProps) {
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

export default function TermsPage() {
  return (
    <main
      className="flex-1"
      id="main-content">
      <section
        className={cn(pageGrid, reveal, 'gap-y-16 py-[clamp(4rem,10vw,9rem)]')}>
        <div className="col-span-full flex flex-col gap-6 md:col-start-1 md:col-end-9">
          <p className={eyebrow}>
            <span>06</span>
            Legal
          </p>
          <h1 className={cn(sectionHeading, 'max-w-[11ch]')}>Terms of Use</h1>
          <div className="grid max-w-[46rem] gap-3">
            <p className="font-heading text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.05] font-[540] tracking-[-0.04em]">
              The agreement for using Unwired products.
            </p>
            <p className="text-muted-foreground text-[1.15rem] leading-[1.7]">
              These shared terms cover current and future Unwired products.
              Product-specific terms may add to or replace a provision where
              they say so expressly.
            </p>
          </div>
        </div>

        <dl className="border-border md:[&>div+div]:border-border col-span-full grid border-y md:col-start-1 md:col-end-13 md:grid-cols-3 [&>div]:grid [&>div]:gap-2 [&>div]:py-5 md:[&>div]:px-6 md:[&>div+div]:border-l md:[&>div:first-child]:pl-0">
          <div>
            <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
              Provider
            </dt>
            <dd className="font-[650]">Unwired, s.r.o.</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-[0.68rem] font-[650] tracking-[0.13em] uppercase">
              Contact
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
            <dd>Effective · 27 August 2026</dd>
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
            Agreement
          </p>
          <nav
            aria-label="Terms of Use sections"
            className="border-border mt-5 flex flex-col border-t">
            {termsSections.map((section, index) => (
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
              Who provides the Products
            </h2>
            <div className="text-muted-foreground mt-6 grid max-w-[48rem] gap-2 leading-[1.75]">
              <p>Unwired, s.r.o.</p>
              <p>Soběšická 184/36, Husovice, 614 00 Brno, Czech Republic</p>
              <p>IČO 19711131 · DIČ CZ19711131</p>
              <p>
                Registered in the Commercial Register maintained by the Regional
                Court in Brno, section C, file 135646.
              </p>
            </div>
          </section>

          <TermsSection
            id="scope"
            index="01"
            title="Scope and acceptance">
            <p>
              These Terms govern your use of Unwired Mail, Unwired Calendar, and
              other software products that Unwired identifies as covered by
              them. They do not govern Frontend Consultancy, which is subject to
              the agreement for each client engagement.
            </p>
            <p>
              Product-specific supplemental terms take precedence over these
              shared Terms where the documents conflict. Mandatory law and
              applicable platform terms also take precedence.
            </p>
            <p>
              An agreement under these Terms is formed only when you accept them
              during Product Account creation or another Product flow. Merely
              viewing this page does not create an agreement.
            </p>
          </TermsSection>

          <TermsSection
            id="eligibility"
            index="02"
            title="Eligibility and Product Accounts">
            <p>
              You must be at least 16 and legally able to enter this agreement.
              If the law where you live requires permission from a parent or
              guardian before you can use a Product, you must have that
              permission. The Products are not directed at children.
            </p>
            <p>
              You are responsible for access to your Product Account, Trusted
              Devices, Recovery Key, and connected accounts. Give Unwired
              accurate information, protect your credentials, and tell Unwired
              promptly if you believe an account or device has been compromised.
            </p>
          </TermsSection>

          <TermsSection
            id="licence"
            index="03"
            title="Product licence">
            <p>
              Subject to these Terms, Unwired grants you a limited, personal,
              non-exclusive, non-transferable, and revocable licence to use each
              Product for its intended purpose on supported devices. You may use
              a Product for personal or organizational mail only when you have
              authority to do so.
            </p>
            <p>
              Unwired and its licensors retain all rights in the Products,
              including their software, design, names, and marks. Open-source
              and other third-party components remain subject to their own
              licence terms, which take precedence for those components.
            </p>
            <p>
              Unwired does not currently publish a paid Product plan. If paid
              features are introduced, Unwired will show the applicable price,
              purchase terms, and any supplemental conditions before purchase.
              Nothing in these Terms authorizes a charge.
            </p>
          </TermsSection>

          <TermsSection
            id="content"
            index="04"
            title="Your content and Mailbox Connections">
            <p>
              You retain your rights in mail, drafts, attachments, preferences,
              and other content you provide or connect to a Product. You grant
              Unwired only the limited permission needed to host encrypted
              Product Sync data, transmit content to services you choose, and
              perform operations you request through a Product.
            </p>
            <p>
              You must have the right to connect each mailbox and process its
              content. Actions you request can send, change, or delete data at
              the selected Mail Provider. That provider continues to host and
              govern provider mail under its own terms.
            </p>
            <p>
              Deleting a Product Account removes Product Account data according
              to the Privacy Notice. It does not delete mail held by a Mail
              Provider or guarantee erasure from a device that remains offline
              or has been compromised. You may need to revoke provider access
              separately.
            </p>
          </TermsSection>

          <TermsSection
            id="ai"
            index="05"
            title="AI assistance">
            <p>
              AI assistance is optional and may be unavailable on unsupported
              devices, operating-system versions, languages, or configurations.
              Preview or beta features may change and may contain defects.
            </p>
            <p>
              AI output may be incomplete, inaccurate, ambiguous, or unsuitable
              for your purpose. Review output against the source material before
              accepting it, sending a message, creating an event, or taking any
              other action. You remain responsible for decisions and content you
              approve.
            </p>
            <p>
              Unwired Products are designed to use supported on-device models
              for personal context. The Privacy Notice distinguishes local
              processing that Unwired does not receive from Product data handled
              by Unwired or its service providers.
            </p>
          </TermsSection>

          <TermsSection
            id="acceptable-use"
            index="06"
            title="Acceptable use">
            <p>You must not use a Product to:</p>
            <ul>
              <li>break the law or infringe another person&apos;s rights;</li>
              <li>
                access a mailbox, account, system, or content without authority;
              </li>
              <li>send spam, malware, or abusive content;</li>
              <li>
                interfere with security, service operation, access controls, or
                another person&apos;s use;
              </li>
              <li>
                resell a Product or use abusive automation without
                Unwired&apos;s written permission; or
              </li>
              <li>
                reverse engineer or circumvent technical protections except
                where applicable law expressly permits it.
              </li>
            </ul>
          </TermsSection>

          <TermsSection
            id="third-parties"
            index="07"
            title="Third-party services and Apple terms">
            <p>
              Products can connect to Apple services and Mail Providers such as
              Google, Microsoft, or standards-based mail servers. Your use of
              those services remains subject to their terms. Unwired does not
              control their availability, data, or account decisions.
            </p>
            <p>
              Where a Product is distributed through Apple and no Unwired custom
              end-user licence is configured in App Store Connect, Apple&apos;s
              Standard EULA governs the installation licence. These Terms govern
              Unwired-operated Product Accounts, features, acceptable use, and
              services to the extent they do not conflict with Apple&apos;s
              terms or mandatory law.
            </p>
          </TermsSection>

          <TermsSection
            id="changes"
            index="08"
            title="Changes, suspension, and ending use">
            <p>
              Unwired may change a Product for security, legal, technical, or
              product reasons. Where consumer law applies to a continuous
              digital service, Unwired will provide the required reasons,
              notice, and remedies for changes that adversely affect use.
            </p>
            <p>
              Unwired may suspend access when reasonably needed to address a
              security threat, unlawful use, a serious breach of these Terms, or
              a legal requirement. Unwired will provide notice when practical.
              If a Product is discontinued, Unwired will give reasonable notice
              where practical and preserve rights that applicable law requires.
            </p>
            <p>
              You may stop using a Product at any time and may delete your
              Product Account through the available account controls. Export
              data you need before deletion. Account deletion is irreversible
              and does not remove data held by a Mail Provider.
            </p>
          </TermsSection>

          <TermsSection
            id="consumer-rights"
            index="09"
            title="Consumer rights">
            <p>
              Nothing in these Terms excludes statutory rights that cannot
              lawfully be excluded. Depending on applicable law, those rights
              may include supply, conformity, security-update, repair, price
              reduction, termination, withdrawal, and damages remedies for
              digital content or services.
            </p>
            <p>
              To the maximum extent permitted by applicable law, Unwired is not
              responsible for failures caused by services you choose,
              unsupported configurations, unauthorized use, or changes outside
              Unwired&apos;s control. No provision limits liability for
              intentional harm, gross negligence, injury to natural rights, or
              any other liability that applicable law does not permit Unwired to
              limit.
            </p>
          </TermsSection>

          <TermsSection
            id="law"
            index="10"
            title="Governing law and disputes">
            <p>
              Czech law governs these Terms. If you are a consumer, this choice
              does not deprive you of mandatory protections under the law of
              your habitual residence. It also does not restrict any right to
              bring or defend a claim in a court made available by applicable
              consumer law.
            </p>
            <p>
              Contact Unwired first at{' '}
              <a
                className={legalLink}
                href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>{' '}
              so the parties can try to resolve a concern directly.
            </p>
            <p>
              Eligible Czech consumer disputes may be submitted to Česká
              obchodní inspekce, Ústřední inspektorát – oddělení ADR, Gorazdova
              1969/24, 120 00 Praha 2, Czech Republic, at{' '}
              <a
                className={legalLink}
                href="mailto:adr@coi.gov.cz">
                adr@coi.gov.cz
              </a>{' '}
              or through the{' '}
              <a
                className={legalLink}
                href="https://coi.gov.cz/informace-o-adr/"
                rel="noreferrer"
                target="_blank">
                Czech Trade Inspection ADR website
              </a>
              .
            </p>
          </TermsSection>

          <section className="border-border border-t pt-10">
            <h2 className="font-heading text-2xl font-[580] tracking-[-0.035em]">
              Changes to these Terms
            </h2>
            <p className="text-muted-foreground mt-4 max-w-[48rem] leading-[1.75]">
              Unwired will update this page and its effective date for material
              changes and provide any notice required by applicable law. A
              material change will not apply retroactively where the law
              prohibits it.
            </p>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                className={legalLink}
                href="/privacy">
                Read the Privacy Notice
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
