# Product legal baseline

Research date: 24 August 2026

This is a bounded product and drafting baseline for Unwired, s.r.o., a Czech company preparing currently free/coming-soon software for EU consumers, potentially through Apple's App Store. It is not legal advice. Czech/EU consumer counsel should review the final Terms of Use, launch flow, Privacy Notice, and App Store configuration before a product becomes available or any paid plan is introduced.

## Decisions this baseline supports

1. Keep the **Terms of Use** and **Privacy Notice** separate. Terms govern the contractual licence and product relationship. The Privacy Notice explains personal-data processing and does not become valid GDPR consent merely because a user accepts the Terms.
2. An umbrella Terms of Use can govern Unwired products, with product-specific supplemental terms taking precedence. It should not govern Frontend Consultancy. While the products are only “coming soon,” the current waitlist is principally a privacy/marketing-consent flow; product terms matter no later than download, account creation, or other product-contract formation.
3. A Czech-law clause needs an express mandatory-consumer-rights saving. Do not require covered consumers to litigate exclusively in Czech courts.
4. Do not use categorical “as is,” “no warranty,” or “no liability” language against consumers. Qualify limitations by applicable law and expressly preserve statutory conformity, remedies, and non-excludable liability.
5. Confirm whether the current free product falls within the Czech ADR regime. If a covered paid consumer contract is offered, include the current Czech ADR disclosure in the Terms and on the website. Do not include the discontinued EU ODR-platform link.
6. Decide whether Apple's Standard EULA will govern the app licence or Unwired will submit a custom EULA. Publishing `/terms` does not itself configure an Apple custom EULA.

## Privacy Notice baseline

The GDPR requires privacy information to be concise, transparent, intelligible, easily accessible, and written in clear language. Where data comes from the person, Articles 13(1)–(2) require the controller's identity/contact details; purposes and legal bases; legitimate interests where used; recipients; third-country transfers and safeguards; retention period or criteria; data-subject rights; consent withdrawal; supervisory-authority complaint; whether providing data is required and the consequences of not doing so; and applicable automated decision-making. Article 14 adds the data categories, source, and timing rules when data is obtained elsewhere. These disclosures must be given at collection, not retrospectively. See [GDPR Articles 12–14](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

For product launch, update the Privacy Notice from the actual product data map: account and sign-in data, Apple receipts or subscription status, diagnostics/crash data, support messages, remote services, email/calendar access, processors, transfers, retention, deletion, and any on-device-only processing. “On-device” data that Unwired never receives should be distinguished from data Unwired or its providers process. Do not describe unspecified future processing as though it already occurs.

Apple separately requires every app to provide an accessible privacy-policy link in App Store Connect metadata and within the app, identifying collected data, collection, use, sharing, retention/deletion, and consent-revocation procedures. See [App Review Guideline 5.1.1](https://developer.apple.com/app-store/review/guidelines/#privacy).

### Children and consent

GDPR Article 8 is narrow: it applies when an information-society service is offered directly to a child **and** the processing relies on consent under Article 6(1)(a). The EU default is 16, but Member States may lower it to no less than 13; below the applicable threshold, the holder of parental responsibility must consent or authorise consent, and the controller must make reasonable verification efforts. This is not a general minimum contracting or product-use age. See [GDPR Article 8](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

Czech law sets this consent capacity at **15** in Section 7 of Act No. 110/2019 Coll.; the Czech Data Protection Authority confirms the age. See the [Czech DPA's official guide](https://uoou.gov.cz/verejnost/zakladni-prirucka-k-ochrane-udaju) and [Act No. 110/2019 Coll.](https://www.e-sbirka.cz/sb/2019/110). For an EU-wide child-directed service, do not assume the Czech threshold resolves every market: determine the audience, lawful basis, and applicable national threshold before launch. Child-facing privacy information must also be age-appropriate.

## EU consumer-contract floor

### Governing law and courts

Under Rome I Article 6, a consumer contract within activities pursued in or directed to the consumer's country is generally governed by the law of the consumer's habitual residence absent a choice. Choosing Czech law cannot remove non-derogable protection the consumer would otherwise receive. See [Regulation (EC) No 593/2008, Article 6](https://eur-lex.europa.eu/eli/reg/2008/593/oj).

Under Brussels I bis Articles 17–19, a covered consumer may generally sue in the trader's courts or the courts where the consumer is domiciled; the trader may sue the consumer only where the consumer is domiciled. Pre-dispute forum clauses may depart from this only in narrow cases. See [Regulation (EU) No 1215/2012, Articles 17–19](https://eur-lex.europa.eu/eli/reg/2012/1215/oj).

Drafting consequence: a Czech-law provision may be used, but say that it does not deprive consumers of mandatory protections and that statutory consumer forum rights remain available. Do not state that Czech courts have exclusive jurisdiction over EU consumer disputes.

### Pre-contract information

Before a distance contract is formed, Consumer Rights Directive Article 6 generally requires clear information about the product's main characteristics; trader identity and contact details; total price or how it is calculated; performance and complaint handling; withdrawal rights or exceptions; contract duration and termination; statutory conformity; and relevant functionality, compatibility, and interoperability. The information becomes part of the contract and must be confirmed on a durable medium. See the [consolidated Consumer Rights Directive, Articles 6 and 8](https://eur-lex.europa.eu/eli/dir/2011/83/2022-05-28). Terms can hold much of this information, but the download, account, or purchase flow must present it at the legally relevant time.

### Digital content and services: conformity

Directive (EU) 2019/770 applies where a consumer pays a price. It also generally applies where the consumer provides personal data, except when the trader processes that data exclusively to supply the digital content/service or meet legal requirements and for no other purpose. A “free” app can therefore still fall within the regime. See [Directive (EU) 2019/770, Article 3](https://eur-lex.europa.eu/eli/dir/2019/770/oj).

The core duties are to supply the product and meet agreed and objectively expected requirements, including functionality, compatibility, interoperability, security, integration, and necessary updates (Articles 5–9). Failure to supply can lead to termination (Article 13). Lack of conformity gives a right to bring the product into conformity and, where the statutory conditions are met, price reduction or termination (Article 14). Continuous products may be modified beyond what conformity requires only under Article 19's conditions, including a valid contractual reason, no extra cost, clear notice, and termination rights for more than minor adverse effects unless the unchanged conforming version remains available. Pre-dispute terms cannot contract out of these rights to the consumer's detriment (Article 22).

Czech implementation is in Civil Code Sections 2389a–2389u; the Czech Trade Inspection's current guidance confirms that apps are digital content, necessary updates must keep them functional and secure, and statutory defect remedies remain available. See the [official Czech Civil Code](https://www.e-sbirka.cz/sb/2012/89) and [Czech Trade Inspection digital-content guidance](https://coi.gov.cz/faq/smlouvy-o-poskytovani-digitalniho-obsahu-ci-sluzby/).

Drafting consequence: describe the product and supported platforms accurately; avoid promising unbuilt features; state support/updates and modification rules consistently with the actual product; preserve statutory remedies; and do not reserve an unrestricted right to change or discontinue a continuous service without the protections required by law.

### Withdrawal

The Consumer Rights Directive generally gives consumers 14 days to withdraw from a distance contract (Article 9), subject to exceptions. Its scope also covers contracts where a consumer provides personal data, subject to the narrow solely-for-supply/legal-requirement exception. For paid services, loss of withdrawal after full performance requires prior express consent and acknowledgement. For paid digital content not supplied on a tangible medium, loss after performance begins requires prior express consent, acknowledgement of the loss, and the required durable-medium confirmation (Article 16). Terms text alone does not capture those choices; the acquisition or activation flow must do so. See the [consolidated Consumer Rights Directive, Articles 3, 6–9, and 14–16](https://eur-lex.europa.eu/eli/dir/2011/83/2022-05-28).

Directive (EU) 2023/2673 required Member States to apply from 19 June 2026 an easy-to-find online withdrawal function for distance contracts concluded through an online interface where a withdrawal right exists. It must remain available during the withdrawal period and provide an acknowledgement on a durable medium. See [Directive (EU) 2023/2673, Articles 1(3) and 2](https://eur-lex.europa.eu/eli/dir/2023/2673/oj). At this research date, the Czech transposition bill had passed both chambers but was not yet shown as promulgated; see [Czech Chamber of Deputies bill status](https://www.psp.cz/sqw/historie.sqw?o=10&T=16). Treat the EU rule as a launch-design requirement and have counsel confirm the enacted Czech text and who owns the withdrawal flow for each Apple distribution/payment route.

## Czech ADR and the former EU ODR platform

Section 14 of the Czech Consumer Protection Act requires a covered seller to identify the competent ADR entity clearly, intelligibly, and accessibly, including its website. The information must appear on the seller's website and in standard terms when the contract refers to them. If a dispute cannot be settled directly, the same information must be supplied on paper or another durable medium. For ordinary paid software disputes outside specialised sectors, the Czech Trade Inspection says it is generally the competent entity. See the [Czech Trade Inspection's Section 14 guidance and model wording](https://coi.gov.cz/pro-podnikatele/informace-pro-prodejce-zbozi-a-sluzeb/mimosoudni-reseni-spotrebitelskych-sporu-adr/) and [Act No. 634/1992 Coll.](https://www.e-sbirka.cz/sb/1992/634).

The Czech Trade Inspection also states that its ADR process does not cover goods or services supplied free of charge where the consumer provided or undertook no financial performance. See its [current ADR FAQ](https://coi.gov.cz/informace-o-adr/casto-kladene-otazky-adr/). Because the present product is described as free/coming soon, counsel should confirm whether Section 14 disclosure is legally required at first launch; including accurate contact information voluntarily is a separate product choice.

The disclosure should identify:

- Česká obchodní inspekce, Ústřední inspektorát – oddělení ADR
- Gorazdova 1969/24, 120 00 Praha 2
- `adr@coi.gov.cz`
- `https://coi.gov.cz/informace-o-adr/`

The EU ODR platform stopped accepting complaints on 20 March 2025 and was discontinued on 20 July 2025. The former duty to link to it ended; Czech ADR disclosure remains. See [Regulation (EU) 2024/3228](https://eur-lex.europa.eu/eli/reg/2024/3228/oj) and the [Czech Ministry of Industry and Trade's current notice](https://mpo.gov.cz/cz/ochrana-spotrebitele/mimosoudni-reseni-spotrebitelskych-sporu-adr/skoncila-informacni-povinnost-obchodniku-o-platforme-odr--288708/).

## Warranty and liability limits

Standard consumer terms are unfair and non-binding when, contrary to good faith, they create a significant imbalance to the consumer's detriment. The Unfair Contract Terms Directive specifically flags clauses that exclude or limit liability for death/personal injury, improperly restrict remedies for non-performance or defective performance, or hinder legal action. See [Directive 93/13/EEC, Articles 3 and 6 and Annex 1(a), (b), and (q)](https://eur-lex.europa.eu/eli/dir/1993/13/oj). Digital-content conformity rights are separately non-excludable under Directive (EU) 2019/770 Article 22.

Czech Civil Code Section 2898 disregards advance limitations affecting a weaker party's damages rights, natural-person rights, intentional harm, or gross negligence. The Ministry of Justice summarises this rule in its [official Civil Code guidance](https://obcanskyzakonik.justice.cz/index.php/nahrada-ujmy/konkretni-zmeny/smluvni-omezeni). Czech consumer rules also disregard adverse departures from statutory consumer protection and abusive exclusions of defect or damages rights; see Civil Code Sections 1812, 1814, and 1815 in the [official Czech Civil Code](https://www.e-sbirka.cz/sb/2012/89).

Drafting consequence: limitations may allocate lawful commercial risk, but must say “to the maximum extent permitted by applicable law,” preserve mandatory consumer and conformity rights, and carve out all liability that cannot legally be excluded or limited. A low universal cap or blanket exclusion is not a safe consumer baseline merely because the product is free.

## Apple EULA decision

If Unwired provides no custom EULA in App Store Connect, Apple's Standard EULA applies in all countries and regions. Apple states that it covers app-accessible content, services, and replacement/supplemental upgrades. For EU, Swiss, Norwegian, and Icelandic citizens, its governing-law/forum clause uses the user's usual residence. See [App Store Connect Help](https://developer.apple.com/help/app-store-connect/manage-app-information/provide-a-custom-license-agreement) and [Apple's Standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

If Unwired submits a custom EULA, it must be configured by territory in App Store Connect and include Apple's ten minimum topics:

1. The agreement is between developer and user, not Apple; developer is responsible, and usage rules must not conflict with Apple terms.
2. A non-transferable Apple-product licence consistent with Usage Rules, Family Sharing, and volume purchasing.
3. Developer responsibility for maintenance/support and no Apple support obligation.
4. Developer warranty responsibility; Apple's purchase-price refund route for warranty failure; remaining responsibility allocated to the developer, subject to applicable law.
5. Developer responsibility for product, regulatory, consumer, and privacy claims, without over-limiting liability.
6. Developer responsibility for third-party intellectual-property claims.
7. US embargo and restricted-party representations.
8. Developer name, address, telephone number, and email for questions and claims.
9. Compliance with applicable third-party terms.
10. Apple and its subsidiaries as third-party beneficiaries entitled to enforce the EULA.

See [Apple's Minimum Terms of Developer's EULA](https://www.apple.com/legal/internet-services/itunes/dev/minterms/).

### Allocation options

The two implementation choices are: (a) let Apple's Standard EULA govern the App Store licence and state that Unwired's Terms govern Unwired-operated product features, accounts, services, and acceptable use only to the extent they do not conflict with the Apple EULA or mandatory law; or (b) make the Terms a compliant custom EULA, add all ten Apple topics, localise as needed, and submit it in App Store Connect for each intended territory. This is a business and legal-review decision; publishing the page alone does not select option (b).

## Pre-launch legal checklist

- Confirm each product's contract-formation moment, price/data exchange, distribution route, supported platforms, user age position, account model, and support/update commitment.
- Complete a product data map and update the Privacy Notice before App Store submission or any product collection; keep consent controls separate from Terms acceptance.
- Decide Standard EULA plus supplemental Terms versus an Apple custom EULA.
- Review the acquisition flow for pre-contract information, withdrawal, waiver/acknowledgement, durable-medium confirmation, and the online withdrawal function.
- Add mandatory consumer-rights savings and lawful change/termination rules; add Czech ADR details if the offering is covered, and do not add an EU ODR link.
- Have Czech/EU consumer counsel review the final English text, any Czech localisation requirement, and each target country's non-derogable rules before release.
