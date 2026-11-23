import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">404</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          This screening is not on the reel.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          That page is missing from the Tiketas programme. Head back to the
          foyer and pick a film that is playing.
        </p>
        <Link to="/" className="btn-maroon">
          Back to now showing
        </Link>
      </section>
    </main>
  )
}
