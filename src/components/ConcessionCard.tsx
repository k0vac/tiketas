import type { Concession } from '#/lib/cinema.ts'
import { formatRsd } from '#/lib/cinema.ts'

export default function ConcessionCard({ item }: { item: Concession }) {
  return (
    <article className="ticket-card overflow-hidden rounded-[1.4rem]">
      <div className="aspect-square bg-[var(--cream-deep)]">
        <img src={item.image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="px-5 py-4">
        <p className="island-kicker m-0">{item.subtitle ?? 'Snack bar'}</p>
        <h3 className="display-title mt-1 mb-2 text-2xl text-[var(--sea-ink)]">
          {item.title}
        </h3>
        <p className="m-0 text-sm leading-6 text-[var(--sea-ink-soft)]">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="m-0 text-lg font-extrabold text-[var(--maroon)]">
            {formatRsd(item.price)}
          </p>
          <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-bold tracking-wide text-[var(--sea-ink-soft)] uppercase">
            At the lobby
          </span>
        </div>
      </div>
    </article>
  )
}
