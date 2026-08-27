# Website legal and privacy release baseline

Research date: 27 August 2026

This note is a release baseline for the current Unwired company website. It is not legal advice. It deliberately separates processing that exists in this repository today from proposed Product processing. Czech/EU counsel should review the final public wording and the operational controls behind it before publication.

## Release conclusion

The current Privacy Notice should become effective only after it is narrowed to the website practices that actually exist and the unresolved provider, retention, and transfer facts below are confirmed. The repository does not implement Product Accounts, Product Sync, Mailbox Connections, push notifications, Convex, or Apple sign-in; those subjects should not be described as current processing in an effective notice.

The current Terms of Use are Product terms, not Company Website terms. Publishing and indexing them does not form a contract: the page itself says acceptance occurs only in a later Product flow. They can be publicly available as prospective terms, but they should not be represented as governing a released Product until the relevant Product, distribution path, and affirmative acceptance flow exist. The broader consumer-law baseline already lives in `docs/research/product-legal-baseline.md`.

Removing `noindex` is not a legal requirement. GDPR instead requires privacy information to be concise, transparent, intelligible, and easily accessible. Removing `noindex` is reasonable once the pages are accurate, effective versions; keep permanent footer links and the just-in-time Privacy Notice link beside the waitlist and consultation actions. See [GDPR Article 12](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

## Facts established by this repository

These are implementation facts, not assumptions about production account settings:

| Flow | Current data and path | Current recipients/storage visible in code |
| --- | --- | --- |
| Website access | Ordinary HTTP request metadata; the site runs on Vercel | Vercel. The app itself does not log request bodies. |
| Theme preference | `unwired-theme` with value `light` or `dark` in browser local storage | Browser only; no server submission in the theme code. |
| Product Waitlist | Email, selected Product interests, platform interests, source page, client-supplied timestamp, and an affirmative checkbox | Submitted to the app-owned tRPC route, then sent to Resend. Resend sends a confirmation to the visitor and a full submission notification to an internal address. There is no waitlist database in this repository. |
| Consultation booking | A link opens `cal.eu`; booking happens outside the Company Website | Cal.eu/Cal.com and the connected Google Workspace calendar/Meet account, according to `CONTEXT.md`. There is no embedded booking widget. |
| Direct email/privacy requests | Email sent to `silhan@unwired.dev` | Google Workspace, according to `CONTEXT.md`. |

The repository and `CONTEXT.md` state that the Company Website has no analytics, advertising trackers, fingerprinting, or third-party embeds. This must also be checked against the production Vercel project and DNS/edge configuration; absence from source code does not prove that no dashboard integration or injected script is enabled.

The company facts currently declared in `CONTEXT.md`, the global footer, and both legal pages are: Unwired, s.r.o.; Soběšická 184/36, Husovice, 614 00 Brno, Czech Republic; IČO 19711131; DIČ CZ19711131; Regional Court in Brno, section C, file 135646. Verify these against a fresh official Commercial Register extract on the publication date rather than treating this note as verification.

## Required public baseline

### Company identity

Czech Civil Code Section 435 requires an entrepreneur to make its name, registered office, public-register entry (including section/file), and identifying number available in remotely accessible public information. The current global footer contains these repo-declared items. The EU eCommerce Directive independently requires a service provider's name, geographic address, email/direct contact details, and register information to be easily, directly, and permanently accessible. See [Czech Civil Code Section 435](https://e-sbirka.gov.cz/sb/2012/89#par_435) and [eCommerce Directive Article 5](https://eur-lex.europa.eu/eli/dir/2000/31/oj).

Czech Act No. 222/2009 Coll. adds pre-contract/service-provider disclosures where applicable, including contact, register, authorisation, VAT, price/terms, guarantee, and professional-liability information depending on the service. The current marketing site does not conclude a consultancy engagement, so do not import e-shop or engagement terms into the public page without mapping the actual contracting flow. See [Act No. 222/2009 Coll.](https://e-sbirka.gov.cz/sb/2009/222) and the [official Czech obligations database](https://dip.gov.cz/dip/en/query/1/2009/222).

Before release, confirm the registered details and that `silhan@unwired.dev` is monitored. A phone number is not established by the repository and should not be invented.

### Privacy Notice contents and timing

For each current processing purpose, the effective notice should state:

- controller identity and contact details;
- the specific data categories, purpose, and Article 6 legal basis;
- the legitimate interest where Article 6(1)(f) is used;
- recipients or categories of recipients;
- any third-country transfer and the actual safeguard, plus how to obtain a copy;
- a meaningful retention period or criterion;
- applicable access, correction, erasure, restriction, portability, objection, and consent-withdrawal rights;
- the right to complain to a supervisory authority;
- whether providing the data is required and what happens if it is not provided; and
- whether automated decision-making or profiling occurs.

The information must be supplied when the data is collected, and it must be kept clear and easily accessible. See [GDPR Articles 12–14](https://eur-lex.europa.eu/eli/reg/2016/679/oj). The current footer and form links are suitable access points, but they do not cure inaccurate or incomplete content.

The current website purposes can be drafted as follows, subject to factual confirmation:

- website delivery, abuse prevention, security, and troubleshooting: legitimate interests under Article 6(1)(f), supported by an internal balancing assessment;
- responding to direct inquiries and requested consultations: steps requested before a contract under Article 6(1)(b), with legitimate interests under Article 6(1)(f) only for a separately articulated follow-up purpose;
- Product Waitlist updates: consent under Article 6(1)(a), together with the separate Czech electronic-marketing consent requirements below; and
- legal claims or mandatory recordkeeping only where an actual legal obligation or legitimate-interest purpose applies.

Do not publish Product Account, Product Sync, mailbox, Apple, Convex, push, or AI data claims until the relevant implementation, providers, data map, legal bases, transfers, and retention controls exist.

The notice should link to or name the Czech Office for Personal Data Protection as the likely lead supervisory authority and should preserve a person's right to complain in another competent EU authority where applicable. The Czech office publishes its complaint route and contact details at [ÚOOÚ: complaint about a controller or processor](https://uoou.gov.cz/verejnost/stiznost-na-spravce-nebo-zpracovatele).

### Browser storage and cookies

ePrivacy Directive Article 5(3) requires prior consent before storing or accessing information on a user's device unless storage/access is solely for transmitting a communication or strictly necessary to provide a service explicitly requested by the user. Czech Electronic Communications Act Section 89(3) implements the opt-in rule. The Czech DPA expressly says the rule also covers local storage and similar technologies, and that a banner is unnecessary where only exempt technical storage is used. See [ePrivacy Directive Article 5(3)](https://eur-lex.europa.eu/eli/dir/2002/58/oj), [Czech Electronic Communications Act Section 89(3)](https://e-sbirka.gov.cz/sb/2005/127#par_89-odst_3), and [ÚOOÚ cookie guidance](https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies).

The `unwired-theme` item is set after a visitor requests a theme and is used only to remember that choice. That supports the strictly-necessary/explicitly-requested exemption, but the final legal review should confirm this classification. The notice should still identify its name, purpose, value, and persistence. If analytics, embeds, fingerprinting, or other nonessential storage is added later, obtain valid prior consent before activation and provide an equally easy refusal/withdrawal path.

### Product Waitlist and marketing email

Czech Act No. 480/2004 Coll. Section 7 generally requires prior consent to send commercial email to a person who is not already a customer. Each message must be clearly identifiable as commercial communication, identify the sender/beneficiary, and provide a valid, direct, effective opt-out address. The Czech DPA says the sender bears the burden of proving consent and recommends double opt-in for web-collected email addresses. See [Act No. 480/2004 Coll. Section 7](https://e-sbirka.gov.cz/sb/2004/480#par_7) and [ÚOOÚ commercial-communications guidance](https://uoou.gov.cz/index.php/profesional/qa-otazky-a-odpovedi/obchodni-sdeleni).

The current form obtains an unticked affirmative checkbox for updates about two named Products. However:

- the client supplies `createdAt` and `sourcePage`, so those values alone are not reliable evidence;
- the confirmation email does not require the recipient to verify ownership of the address and is not double opt-in;
- the only durable consent record visible in the repository is the internal notification email and provider records; and
- there is no suppression store or automated withdrawal workflow in this repository.

Before sending Product updates, establish a documented consent record, withdrawal/suppression process, and deletion workflow. Every update needs the sender identity and a direct, free withdrawal method. Retain only the minimum suppression/evidence record needed to avoid re-mailing and demonstrate compliance, with a documented lawful basis and retention criterion. Do not promise deletion “within 30 days” unless deletion from Google Workspace, Resend, backups/logs, and any suppression record is operationally achievable.

If updates are sent to US recipients, the FTC's CAN-SPAM guidance additionally requires accurate headers and subject lines, sender identification, a valid physical postal address, a clear opt-out mechanism, and honoring opt-outs within ten business days. This is an email-program requirement, not a reason to add generic US privacy-law text to the website. See the [FTC CAN-SPAM compliance guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).

### Processors, transfers, and retention

GDPR Article 28 requires controller-processor terms. Chapter V requires a valid transfer basis where personal data moves outside the EEA. The public notice must report the actual arrangement, not a provider's generic capability. See [GDPR Articles 28 and 44–49](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

| Provider | Primary-source finding | Release fact to confirm |
| --- | --- | --- |
| Vercel | Vercel's current DPA describes Vercel as processor for Customer Data on **Pro and Enterprise** plans and lists subprocessors/transfers. Vercel's runtime-log documentation gives plan-dependent retention: one hour on Hobby, one day on Pro, three days on Enterprise, or 30 days with Observability Plus. See [Vercel DPA](https://vercel.com/legal/dpa) and [Vercel runtime logs](https://vercel.com/docs/logs/runtime). | Production plan, whether the DPA applies/has been accepted, enabled Observability or log drains, actual request fields, log retention, and transfer mechanism. `preferredRegion = 'fra1'` does not establish EU-only processing for the full Vercel service. |
| Resend | Resend's DPA says customer email addresses, metadata, and message content are Customer Personal Data; primary processing occurs in the United States; the DPA incorporates EU SCCs for relevant transfers; and account data is deleted within 90 days after account termination. See [Resend DPA](https://resend.com/legal/dpa) and [Resend subprocessors](https://resend.com/legal/subprocessors). | DPA status, current subprocessors, routine email/message/log retention and deletion controls, whether content storage is configured, and how individual waitlist records will be erased while a minimal suppression/evidence record is retained. The DPA's 90-day post-termination statement is not a per-message retention promise. |
| Google Workspace | Google's current Cloud Data Processing Addendum covers Workspace Customer Data and subprocessors; Google's August 2026 help page says some agreements incorporate it while others require opt-in. See [Google Cloud Data Processing Addendum](https://cloud.google.com/terms/data-processing-addendum), [Google Workspace privacy compliance help](https://knowledge.workspace.google.com/admin/compliance/privacy-compliance-and-records-for-google-workspace-and-cloud-identity), and [Google Workspace subprocessors](https://workspace.google.com/terms/subprocessors/). | Contract/CDPA acceptance, Workspace edition, admin data-region choices, mailbox/calendar/Meet retention, Vault or backup holds, deletion capability, and transfer safeguards. |
| Cal.eu / Cal.com | Cal.com says a customer is controller and Cal.com processor for bookings through the customer's link. Cal.com announced that Cal.eu will shut down on **1 November 2026** for non-extended accounts and that migration to international Cal.com is optional, not automatic. Cal.com's current privacy notice says Cal.com is US-based and international data transfers rely on SCCs or an adequacy mechanism; EU residency is a separate option. See [Cal.com privacy notice](https://cal.com/privacy) and [Cal.eu migration announcement](https://cal.com/blog/cal.eu-to-cal.com-migration). | Whether the current account is Cal.eu, whether it has an Enterprise extension, the chosen migration/replacement, DPA, booking fields, integrations, actual data region, retention/deletion, and updated public link. The current “EU-hosted” claim has a near-term expiry and must not survive a move to standard Cal.com without reassessment. |

## Internal controls needed behind the notice

These do not all belong in public copy, but the public promises depend on them:

- maintain a record of processing for website access, consultation leads, direct email, and the Product Waitlist;
- accept and retain applicable processor agreements and monitor subprocessors;
- document the legitimate-interest assessment for hosting/security and any inquiry follow-up;
- document waitlist consent, withdrawal, suppression, and deletion procedures;
- define who handles privacy requests, identity verification, the GDPR one-month response clock, provider searches, and deletion exceptions;
- define retention by system, not only by purpose;
- document incident response and processor-notification contacts; and
- review production configuration before every material notice update.

See [GDPR Articles 5, 7, 12, 24, 28, 30, and 32–34](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

## Terms-specific release cautions

The effective Terms must not claim a blanket warranty or liability release. Czech Civil Code Section 2898 prevents advance exclusion or limitation for harm to a person's natural rights, intentional or grossly negligent harm, and compensation rights of a weaker party. Any limitation should operate only to the maximum extent permitted by applicable law and preserve mandatory consumer and other non-excludable rights. See [Czech Civil Code Sections 2898 and 1812–1815](https://e-sbirka.gov.cz/sb/2012/89).

If the current site only provides B2B consultancy information, external booking, and a Product Waitlist, do not add e-shop boilerplate as though a consumer purchase occurs on the site. If a consumer can later conclude or pay for a service online, redo the pre-contract, withdrawal, pricing, complaint, conformity, and Czech ADR review for that exact flow. Do not add the former EU ODR-platform link: Regulation (EU) 2024/3228 repealed that platform regime from 20 July 2025. See [Regulation (EU) 2024/3228](https://eur-lex.europa.eu/eli/reg/2024/3228/oj) and [Czech Trade Inspection ADR guidance](https://coi.gov.cz/pro-podnikatele/informace-pro-prodejce-zbozi-a-sluzeb/mimosoudni-reseni-spotrebitelskych-sporu-adr/).

## Release blockers and placeholders

Resolve these before presenting the pages as legally reviewed, effective, and complete:

1. **Legal review owner:** name the qualified Czech/EU reviewer or remove any implication that legal review has occurred.
2. **Effective dates and version record:** choose the actual publication date and preserve the approved text/version. Do not claim retroactive effect.
3. **Official entity verification:** verify company name, registered office, IČO, DIČ, and register file on publication day.
4. **Current-only privacy scope:** remove proposed Product processing from the effective website notice or keep it in a clearly separate, non-effective planning document.
5. **Provider facts:** resolve every confirmation item in the table above, especially Vercel plan/DPA, Resend retention, Google Workspace CDPA/retention, and the Cal.eu shutdown decision.
6. **Waitlist operations:** implement auditable consent evidence, withdrawals/suppression, and provider-aware deletion; decide whether to add double opt-in.
7. **Retention:** replace “provider-configured” or aspirational periods with actual periods or meaningful criteria tied to each system.
8. **Transfers:** name the actual transfer basis per provider and explain how a person can obtain the relevant safeguards.
9. **Terms status:** decide whether `/terms` is a prospective publication or an agreement first presented in a Product acceptance flow. Publishing/indexing alone does not create acceptance.
10. **Future changes:** keep analytics, advertising, embeds, nonessential storage, new forms, and Product processing gated on a new data-map and consent/notice review.

No repository fact supports adding a CCPA/CPRA threshold claim, a “Do Not Sell or Share” mechanism, a DPO, or an Article 27 EU representative. Confirm applicability before adding any of them; do not fill those gaps with boilerplate.
