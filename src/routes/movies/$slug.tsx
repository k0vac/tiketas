import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getMovieBySlug } from '#/assets/movies.ts'
import ScreeningTable from '#/components/ScreeningTable.tsx'
import {
  formatDateLabel,
  formatRuntime,
  getMovieScreenings,
  getTrailerKey,
  getUpcomingDates,
} from '#/lib/cinema.ts'

export const Route = createFileRoute('/movies/$slug')({
  loader: ({ params }) => {
    const movie = getMovieBySlug(params.slug)
    if (!movie) {
      throw notFound()
    }
    return { movie }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.movie
          ? `${loaderData.movie.title} · Tiketas`
          : 'Film · Tiketas',
      },
    ],
  }),
  component: MovieDetails,
})

function MovieDetails() {
  const { movie } = Route.useLoaderData()
  const trailerKey = getTrailerKey(movie)
  const movieScreenings = getMovieScreenings(movie.id)
  const dates = getUpcomingDates(movie.id, 5)
  const directors = movie.directors.join(', ')
  const starring = movie.cast.slice(0, 6).map((person) => person.name)

  return (
    <main className="pb-10">
      <section className="relative min-h-[42vh] overflow-hidden">
        {movie.backdrop ? (
          <img
            src={movie.backdrop}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="hero-scrim absolute inset-0" />
        <div className="page-wrap relative flex min-h-[42vh] items-end px-4 pb-10 pt-24">
          <div className="max-w-3xl text-[#fbf6ec] [text-shadow:0_2px_24px_rgba(28,12,10,0.45)]">
            <Link
              to="/"
              className="mb-4 inline-block text-xs font-bold tracking-[0.16em] text-[#e8b2ab] uppercase no-underline"
            >
              ← Repertoar
            </Link>
            <h1 className="display-title mb-3 text-4xl leading-[0.95] font-bold sm:text-6xl">
              {movie.title}
            </h1>
            {movie.tagline ? (
              <p className="m-0 text-lg text-[#f3e6d4] italic">{movie.tagline}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="page-wrap grid gap-8 px-4 pt-10 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-black shadow-[0_22px_44px_rgba(110,34,30,0.12)]">
          <div className="relative aspect-video">
            <iframe
              title={`${movie.title} trailer`}
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <aside className="island-shell rounded-[1.5rem] p-6">
          <p className="island-kicker mb-3">Details</p>
          <dl className="m-0 grid gap-3 text-sm">
            <Meta label="Directed by" value={directors || 'TBA'} />
            <Meta label="Runtime" value={formatRuntime(movie.runtime)} />
            <Meta
              label="Released"
              value={movie.releaseDate ? formatDateLabel(movie.releaseDate, 'long') : 'TBA'}
            />
            <Meta label="Rating" value={movie.certification ?? 'Unrated'} />
            <Meta label="Genre" value={movie.genres.join(', ') || 'TBA'} />
            <Meta label="Starring" value={starring.join(', ')} />
          </dl>
          {dates.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {dates.map((date) => (
                <span
                  key={date}
                  className="rounded-full border border-[var(--line)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-semibold text-[var(--sea-ink)]"
                >
                  {formatDateLabel(date)}
                </span>
              ))}
            </div>
          ) : null}
        </aside>
      </section>

      {movie.overview ? (
        <section className="page-wrap px-4 pt-8">
          <p className="m-0 max-w-3xl text-base leading-7 text-[var(--sea-ink-soft)]">
            {movie.overview}
          </p>
        </section>
      ) : null}

      <section className="page-wrap px-4 pt-10">
        <p className="island-kicker mb-2">Blagajna</p>
        <h2 className="display-title mb-5 text-3xl text-[var(--sea-ink)]">
          Availability and ticket prices
        </h2>
        <ScreeningTable screenings={movieScreenings} />
      </section>
    </main>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-[var(--maroon)]">{label}</dt>
      <dd className="mt-0.5 text-[var(--sea-ink)]">{value}</dd>
    </div>
  )
}
