import { createFileRoute } from '@tanstack/react-router'
import { cinema } from '#/lib/cinema.ts'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [{ title: 'About · Tiketas' }],
  }),
})

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell overflow-hidden rounded-[2rem]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10">
            <p className="island-kicker mb-3">Bioskop</p>
            <h1 className="display-title mb-4 text-4xl text-[var(--sea-ink)] sm:text-5xl">
              A small cinema with a loud maroon curtain.
            </h1>
            <p className="mb-4 max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)]">
              Tiketas is a mock box office for {cinema.city}: nine films, five
              days of times, popcorn in the lobby, and no real payments. It is a
              proof of concept for how a neighbourhood cinema might sell seats
              and snacks from one cream-coloured foyer.
            </p>
            <p className="m-0 max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)]">
              Walk in at {cinema.address}, {cinema.district}. English prints
              with Serbian subtitles. Student, regular, and VIP tickets at the
              desk — online booking is still waiting in the wings.
            </p>
          </div>
          <div className="border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--cream-deep)_55%,transparent)] p-6 sm:p-10 lg:border-t-0 lg:border-l">
            <p className="island-kicker mb-4">House notes</p>
            <dl className="m-0 grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-[var(--maroon)]">Address</dt>
                <dd className="mt-1 text-[var(--sea-ink)]">
                  {cinema.address}, {cinema.district}, {cinema.city}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--maroon)]">Box office</dt>
                <dd className="mt-1 text-[var(--sea-ink)]">{cinema.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--maroon)]">Programme</dt>
                <dd className="mt-1 text-[var(--sea-ink)]">
                  Four halls · 16:15 to 21:45 · snacks at the šank
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  )
}
