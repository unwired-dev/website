import type { Metadata } from 'next';

import { ProductWaitlistForm } from '@/components/waitlist/product-waitlist-form';

export const metadata: Metadata = {
  title: 'Product waitlist',
  description:
    'Join the shared Unwired product waitlist for coming soon on-device AI products.',
};

const notes = [
  {
    index: '01',
    title: 'One shared list',
    description: 'Follow Mail, Calendar, or both without separate signups.',
  },
  {
    index: '02',
    title: 'Your platforms',
    description: 'Choose macOS, iOS, and iPadOS interest.',
  },
  {
    index: '03',
    title: 'Occasional updates',
    description:
      'Hear about meaningful product progress, not a noisy campaign.',
  },
];

export default function ProductWaitlistPage() {
  return (
    <main
      className="site-main waitlist-page"
      id="main-content">
      <section className="waitlist-layout page-grid reveal">
        <div className="waitlist-intro">
          <p className="eyebrow">
            <span>03</span>
            Product waitlist
          </p>
          <h1>Stay close to what Unwired is building.</h1>
          <p className="waitlist-intro__lead">
            One shared waitlist for coming soon on-device AI products for
            personal communication and time.
          </p>
          <ol className="waitlist-notes">
            {notes.map((note) => (
              <li key={note.index}>
                <span>{note.index}</span>
                <div>
                  <h2>{note.title}</h2>
                  <p>{note.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <section
          aria-labelledby="waitlist-form-title"
          className="waitlist-form-shell reveal reveal--delay">
          <div className="waitlist-form-shell__header">
            <span>Interest note</span>
            <span>Unwired / 2026</span>
          </div>
          <h2 id="waitlist-form-title">Tell us what you care about.</h2>
          <ProductWaitlistForm />
        </section>
      </section>
    </main>
  );
}
