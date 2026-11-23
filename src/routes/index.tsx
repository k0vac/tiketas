import { createFileRoute, Link } from '@tanstack/react-router'
import { movies } from '#/assets/movies.ts'
import ConcessionCard from '#/components/ConcessionCard.tsx'
import MovieCard from '#/components/MovieCard.tsx'
import {
  cinema,
  concessions,
  formatDateLabel,
  formatRuntime,
  getFeaturedMovie,
  getMovieScreenings,
  getUpcomingDates,
} from '#/lib/cinema.ts'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const featured = getFeaturedMovie()
  const upcoming = getUpcomingDates(featured.id, 5)
  const todayScreenings = getMovieScreenings(featured.id).filter(
    (screening) => screening.date === upcoming[0],
  )

  return (
    <main className="pb-8">
      <section className="relative min-h-[72vh] overflow-hidden">
        {featured.backdrop ? (
          <img
            src={featured.backdrop}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="hero-scrim absolute inset-0" />
        <div className="sprocket-edge pointer-events-none absolute inset-y-0 left-0 hidden w-5 opacity-80 sm:block" />
        <div className="page-wrap relative flex min-h-[72vh] items-end px-4 pb-12 pt-24">
          <div className="rise-in max-w-2xl text-[#fbf6ec] [text-shadow:0_2px_24px_rgba(28,12,10,0.45)]">
            <p className="mb-3 text-[0.69rem] font-bold tracking-[0.18em] text-[#f0c7c2] uppercase">
              Now on screen · {cinema.name}
            </p>
            <h1 className="display-title mb-4 text-5xl leading-[0.95] font-bold tracking-tight text-[#fff8ef] sm:text-7xl">
              {featured.title}
            </h1>
            {featured.tagline ? (
              <p className="mb-5 text-lg text-[#f3e6d4] italic">{featured.tagline}</p>
            ) : null}
            <p className="mb-6 max-w-xl text-sm leading-6 text-[#e8d9c8] sm:text-base">
              {featured.genres.join(' · ')}
              {featured.runtime ? ` · ${formatRuntime(featured.runtime)}` : ''}
              {featured.certification ? ` · ${featured.certification}` : ''}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {upcoming.map((date) => (
                <span
                  key={date}
                  className="rounded-full border border-[rgba(251,246,236,0.22)] bg-[rgba(28,12,10,0.35)] px-3 py-1.5 text-xs font-semibold tracking-wide"
                >
                  {formatDateLabel(date)}
                  {todayScreenings.length > 0 && date === upcoming[0]
                    ? ` · ${todayScreenings.map((item) => item.time).join(', ')}`
                    : ''}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/movies/$slug"
                params={{ slug: featured.slug }}
                className="btn-maroon"
              >
                Film details
              </Link>
              <a href="#now-showing" className="btn-ghost">
                Full repertoire
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="now-showing" className="page-wrap px-4 pt-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="island-kicker mb-2">Repertoar</p>
            <h2 className="display-title m-0 text-3xl text-[var(--sea-ink)] sm:text-4xl">
              Playing this week
            </h2>
          </div>
          <p className="m-0 max-w-sm text-sm text-[var(--sea-ink-soft)]">
            Five days of screenings from {formatDateLabel(upcoming[0] ?? '2026-11-23')}.
            Pick a poster for times, prices, and the trailer.
          </p>
        </div>
        <div className="poster-scroll">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="page-wrap px-4 pt-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="island-kicker mb-2">Šank</p>
            <h2 className="display-title m-0 text-3xl text-[var(--sea-ink)] sm:text-4xl">
              Something for the interval
            </h2>
          </div>
          <Link to="/snacks" className="btn-cream">
            All snacks
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {concessions.map((item) => (
            <ConcessionCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  )
}
