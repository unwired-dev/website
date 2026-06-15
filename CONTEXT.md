# Unwired Website

This context defines the business language for Unwired's public company website. It exists to keep positioning, product references, and service language consistent as the site is designed and built.

## Language

**Unwired**:
The company behind the website, offering frontend consultancy while building its own on-device AI products.
_Avoid_: Agency, studio, vendor

**Unwired Mail**:
A coming soon privacy-first email client with on-device AI, presented as a first-class Unwired product.
_Avoid_: Secure-first email, available app, side project, demo app, product proof

**Unwired Calendar**:
A coming soon calendar product centered on on-device AI for remembering what matters, presented as a first-class Unwired product.
_Avoid_: Available app, reminders you never forget, suite module, scheduling platform, generic calendar app

**Company Website**:
The public marketing site for Unwired's product and consultancy portfolio, with consultancy remaining the primary revenue conversion path.
_Avoid_: Consultancy-only site, product-only site, docs site

**Products**:
The Unwired-owned software apps promoted on the company website, presented as separate apps under one product philosophy rather than as a suite.
_Avoid_: Suite, platform, side projects, demos, experiments

**Product Philosophy**:
Unwired products use on-device AI for personal communication and time.
_Avoid_: AI suite, productivity platform, cloud AI tools

**On-Device AI**:
AI that runs on the user's device so personal mail and calendar context do not need to be sent to a cloud model.
_Avoid_: Never sent to the cloud, cloud AI, server-side AI, generic AI features

**Services**:
The client-facing consultancy offers promoted on the company website, with Frontend Consultancy as the primary service.
_Avoid_: Agency services, outsourcing, staff augmentation

**Frontend Consultancy**:
The primary Unwired service offer for product teams that need senior frontend implementation, React implementation, UI architecture, or design-system work.
_Avoid_: General software consulting, full-service development, staff augmentation

**Consultancy Lead**:
A prospective client engagement for React or frontend consulting services initiated through the website.
_Avoid_: User signup, app install

**Primary Call To Action**:
The main Services conversion action is to book a frontend consultation for Frontend Consultancy through https://cal.com/jan-silhan-unwired/frontend-consultation.
_Avoid_: Book a generic consultation, sign up, install app, get started

**Consultancy Contact Email**:
The fallback contact address for Frontend Consultancy inquiries is silhan@unwired.dev.
_Avoid_: Generic contact address, product support address

**Product Call To Action**:
The product conversion action for coming soon Unwired products is to join the waitlist.
_Avoid_: Download, install, buy now

**Product Waitlist**:
A shared page-based interest list for coming soon Unwired products, allowing prospective users to express interest in Mail, Calendar, or both, including platform interest. Product updates may cover both products by default.
_Avoid_: Separate app waitlists, product signup, app account

**Waitlist API**:
The tRPC backend surface in the Company Website app that handles Product Waitlist submissions and sends Resend email notifications.
_Avoid_: Static-only form, separate service, embedded database in the website

**Product Platform Interest**:
The product waitlist captures interest in macOS, iOS, and iPadOS versions of Unwired products.
_Avoid_: Android, Windows, web app

**Primary Buyer**:
The CTO, engineering manager, or startup founder evaluating Unwired for senior React and frontend consulting on product delivery, UI architecture, or design-system work.
_Avoid_: End user, app customer, subscriber

**Product Audience**:
People interested in on-device AI tools for personal email and calendar workflows.
_Avoid_: Consultancy buyer, enterprise buyer, account holder

**Primary Offer**:
Senior frontend consultancy for product teams through implementation, frontend architecture, design-system work, and targeted advisory.
_Avoid_: General software consulting, full-service development

**Primary Positioning**:
Unwired provides hands-on frontend implementation and frontend leadership for product teams, most often through clearly scoped engagements.
_Avoid_: Staff augmentation, outsourced dev shop

**Founder Proof**:
The primary source of credibility for the website is Jan Šilhan's selected work and professional experience, with LinkedIn serving as the public record of relevant work history.
_Avoid_: Anonymous company proof, purely brand-led credibility, unsupported case studies

**Founder-Led Consultancy**:
Unwired is presented as a consultancy brand led directly by its founder, with the founder's expertise and judgment central to the buying decision.
_Avoid_: Agency collective, company-first positioning

**Website Voice**:
The website uses Unwired as the default subject and names Jan Šilhan directly in founder-led credibility sections.
_Avoid_: Anonymous we, agency team voice

**Homepage Promise**:
Unwired builds on-device AI products and helps teams ship better frontends.
_Avoid_: Full-service product studio messaging, generic innovation claims

**Homepage Bridge**:
The same product judgment behind Unwired Mail and Unwired Calendar is available to product teams through Frontend Consultancy.
_Avoid_: Products as side projects, consultancy as unrelated service

**Homepage Offer Order**:
The homepage introduces Products before Services while keeping Book a frontend consultation within the Services path as the primary revenue call to action.
_Avoid_: Consultancy-first page structure, product-only page structure

**Selected Experience**:
A compact homepage proof section before About, grounded in category-level selected work and LinkedIn-backed professional experience.
_Avoid_: Selected Work / Experience, unsupported case studies, client-logo wall, generic testimonials, unapproved company names

**Product Proof Page**:
An app-focused page that should exist only when a product has enough substance to justify a dedicated page beyond the homepage section.
_Avoid_: Thin product page, side-project page, demo page

**Growth-Ready Website**:
The website should launch as a small marketing site backed by a tRPC API for owned conversion flows, while using a stack that can expand into articles, case studies, and product-backed interactions later without requiring a rewrite.
_Avoid_: Static-only brochure site, throwaway brochure site, CMS-first platform

**Repo-Owned Content**:
The website's content should live in the repository as Markdown or MDX and be edited directly in code for the first version.
_Avoid_: CMS-managed content, database-backed editorial workflow

**React-Based Framework**:
The website should be built with a React-based framework so the implementation itself reflects the frontend expertise Unwired is selling, while using app-owned tRPC backend routes where useful.
_Avoid_: Plain HTML brochure stack, static-site-only architecture, non-React primary framework
