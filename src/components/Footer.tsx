import { Link } from '@tanstack/react-router'
import { cinema } from '#/lib/cinema.ts'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-16 px-4 pb-12 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap grid gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img
            src="/assets/img/brand/logotiketas.png"
            alt="Tiketas"
            className="mb-4 h-12 w-auto object-contain"
          />
          <p className="m-0 max-w-sm text-sm leading-6">
            {cinema.tagline}. Tickets, popcorn, and evening seats at{' '}
            {cinema.address}, {cinema.district}.
          </p>
        </div>
        <div>
          <p className="island-kicker mb-3">Visit</p>
          <p className="m-0 text-sm leading-7 text-[var(--sea-ink)]">
            {cinema.address}
            <br />
            {cinema.district}, {cinema.city}
            <br />
            {cinema.phone}
          </p>
        </div>
        <div>
          <p className="island-kicker mb-3">Inside</p>
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <Link to="/" className="text-[var(--sea-ink)] no-underline hover:text-[var(--maroon)]">
              Now showing
            </Link>
            <Link
              to="/snacks"
              className="text-[var(--sea-ink)] no-underline hover:text-[var(--maroon)]"
            >
              Snacks & drinks
            </Link>
            <Link
              to="/about"
              className="text-[var(--sea-ink)] no-underline hover:text-[var(--maroon)]"
            >
              About Tiketas
            </Link>
          </div>
        </div>
      </div>
      <p className="page-wrap mt-10 text-xs tracking-wide text-[var(--sea-ink-soft)]">
        © {year} Tiketas Bioskop. A mock box office — no real payments.
      </p>
    </footer>
  )
}
