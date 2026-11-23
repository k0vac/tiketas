import { useEffect, useState } from 'react'
import type { Screening } from '#/lib/cinema.ts'
import {
  formatDateLabel,
  formatRsd,
  getRememberedScreening,
  occupancyLabel,
  rememberScreening,
  ticketTypes,
} from '#/lib/cinema.ts'

export default function ScreeningTable({
  screenings,
}: {
  screenings: Array<Screening>
}) {
  const [noticeId, setNoticeId] = useState<string | null>(null)

  useEffect(() => {
    setNoticeId(getRememberedScreening())
  }, [])

  function onBuy(screening: Screening) {
    rememberScreening(screening.id)
    setNoticeId(screening.id)
  }

  if (screenings.length === 0) {
    return (
      <p className="m-0 text-[var(--sea-ink-soft)]">
        No screenings are listed for the next few days.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {noticeId ? (
        <p className="notice-banner m-0 rounded-2xl px-4 py-3 text-sm leading-6">
          Online booking is not open yet. This screening was saved on this
          device — visit the box office to buy the ticket.
        </p>
      ) : null}

      <div className="grid gap-3">
        {screenings.map((screening) => {
          const selected = noticeId === screening.id
          return (
            <article
              key={screening.id}
              className="ticket-card rounded-[1.35rem] p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="display-title m-0 text-xl text-[var(--sea-ink)]">
                    {formatDateLabel(screening.date)} · {screening.time}
                  </p>
                  <p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
                    {screening.hall} · {screening.language} / {screening.subtitles}{' '}
                    subtitles
                  </p>
                  <p className="mt-2 mb-0 text-xs font-bold tracking-[0.12em] text-[var(--maroon)] uppercase">
                    {occupancyLabel(screening)} · {screening.availableSeats}/
                    {screening.capacity} seats
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-maroon px-4 py-2 text-xs"
                  onClick={() => onBuy(screening)}
                >
                  {selected ? 'Saved' : 'Buy ticket'}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {ticketTypes.map((type) => (
                  <span
                    key={type.id}
                    className="rounded-full border border-[var(--line)] bg-[var(--chip-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--sea-ink)]"
                  >
                    {type.label} {formatRsd(screening.prices[type.id])}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
