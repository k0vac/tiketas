import { Link } from '@tanstack/react-router'
import type { MovieProfile } from '#/assets/types.ts'
import { formatDateLabel, getNextScreening } from '#/lib/cinema.ts'

export default function MovieCard({ movie }: { movie: MovieProfile }) {
  const next = getNextScreening(movie.id)

  return (
    <Link
      to="/movies/$slug"
      params={{ slug: movie.slug }}
      className="ticket-card group block overflow-hidden rounded-[1.35rem] no-underline"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[var(--cream-deep)]">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        {movie.certification ? (
          <span className="absolute left-3 top-3 rounded-full bg-[rgba(28,12,10,0.72)] px-2.5 py-1 text-[0.68rem] font-bold tracking-wide text-[#fbf6ec]">
            {movie.certification}
          </span>
        ) : null}
      </div>
      <div className="border-t border-dashed border-[var(--line)] px-3.5 py-3.5">
        <h3 className="display-title m-0 text-[1.05rem] leading-snug font-semibold text-[var(--sea-ink)]">
          {movie.title}
        </h3>
        <p className="mt-1.5 mb-0 text-sm text-[var(--sea-ink-soft)]">
          {next
            ? `${formatDateLabel(next.date)} · ${next.time}`
            : 'Dates to be announced'}
        </p>
      </div>
    </Link>
  )
}
