export default function UnwiredMailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:px-10">
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-12">
        {children}
      </article>
    </main>
  );
}
