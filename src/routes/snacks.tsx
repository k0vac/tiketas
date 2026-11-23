import { createFileRoute } from '@tanstack/react-router'
import ConcessionCard from '#/components/ConcessionCard.tsx'
import { concessions } from '#/lib/cinema.ts'

export const Route = createFileRoute('/snacks')({
  component: Snacks,
  head: () => ({
    meta: [{ title: 'Snacks · Tiketas' }],
  }),
})

function Snacks() {
  return (
    <main className="page-wrap px-4 py-12">
      <p className="island-kicker mb-2">Šank</p>
      <h1 className="display-title mb-3 text-4xl text-[var(--sea-ink)] sm:text-5xl">
        Beverages and snacks to go with the picture.
      </h1>
      <p className="mb-10 max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)]">
        Collect these at the lobby counter with your ticket. Prices are in
        dinars. Online snack orders are not live yet — the šank still takes
        cash and cards in person.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {concessions.map((item) => (
          <ConcessionCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  )
}
