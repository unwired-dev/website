import type { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@unwired/ui/components/card';

import { ProductWaitlistForm } from '@/components/waitlist/product-waitlist-form';

export const metadata: Metadata = {
  title: 'Product waitlist | Unwired',
  description:
    'Join the shared Unwired product waitlist for coming soon on-device AI products.',
};

const productNotes = [
  'One shared list for coming soon Unwired products.',
  'Choose interest in Unwired Mail, Unwired Calendar, or both.',
  'Select macOS, iOS, and iPadOS platform interest.',
];

export default function ProductWaitlistPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
      <section className="flex flex-col gap-6">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          Join the Unwired product waitlist.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-8">
          This is one shared waitlist for coming soon Unwired products centered
          on on-device AI for personal communication and time.
        </p>
        <ul className="border-border text-muted-foreground flex flex-col gap-3 border-t pt-6 text-base leading-7">
          {productNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-[-0.03em]">
            Product interest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductWaitlistForm />
        </CardContent>
      </Card>
    </main>
  );
}
