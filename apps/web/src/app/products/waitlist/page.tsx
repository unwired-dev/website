import type { Metadata } from 'next';

import { cn } from '@unwired/ui/lib/utils';

import {
  eyebrow,
  pageGrid,
  reveal,
  revealDelay,
} from '@/components/marketing-styles';
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
      className="flex-1"
      id="main-content">
      <section
        className={cn(pageGrid, reveal, 'gap-y-16 py-[clamp(4rem,10vw,9rem)]')}>
        <div className="col-span-full flex flex-col items-start gap-6 md:col-start-1 md:col-end-7">
          <p className={eyebrow}>
            <span>03</span>
            Product waitlist
          </p>
          <h1 className="font-heading max-w-[11ch] text-[clamp(3.5rem,9vw,8rem)] leading-[0.87] font-[580] tracking-[-0.065em] text-balance">
            Stay close to what Unwired is building.
          </h1>
          <p className="text-muted-foreground max-w-[38rem] text-[1.15rem] leading-[1.65]">
            One shared waitlist for coming soon on-device AI products for
            personal communication and time.
          </p>
          <ol className="[&_li]:border-border [&_h2]:font-heading [&_p]:text-muted-foreground mt-6 w-full list-none [&_h2]:text-[1.1rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.025em] [&_li]:grid [&_li]:grid-cols-[2rem_1fr] [&_li]:gap-4 [&_li]:border-t [&_li]:py-4 [&_li>span]:text-[0.7rem] [&_li>span]:text-[var(--signal)] [&_li>span]:tabular-nums [&_p]:mt-1 [&_p]:text-[0.9rem] [&_p]:leading-[1.55]">
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
          className={cn(
            reveal,
            revealDelay,
            'col-span-full self-start border border-border bg-[var(--surface-1)] p-[clamp(1.25rem,4vw,2.5rem)] md:sticky md:top-8 md:col-start-8 md:col-end-13',
          )}>
          <div className="border-border text-muted-foreground flex justify-between gap-4 border-b pb-4 text-[0.66rem] font-[650] tracking-[0.13em] uppercase tabular-nums">
            <span>Interest note</span>
            <span>Unwired / 2026</span>
          </div>
          <h2
            className="font-heading my-12 max-w-[12ch] text-[clamp(2.3rem,5vw,4rem)] leading-[0.95] font-[580] tracking-[-0.055em]"
            id="waitlist-form-title">
            Tell us what you care about.
          </h2>
          <ProductWaitlistForm />
        </section>
      </section>
    </main>
  );
}
