import { Link } from '@tanstack/react-router'
import { withBase } from '#/lib/paths.ts'
import ThemeToggle from './ThemeToggle'

const logoSrc = withBase('/assets/img/brand/logotiketas.png') ?? ''

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-2 sm:py-2.5">
        <Link
          to="/"
          className="inline-flex h-12 w-40 items-center overflow-hidden no-underline sm:w-48"
          aria-label="Tiketas home"
        >
          <img
            src={logoSrc}
            alt="Tiketas"
            className="h-16 w-full origin-left scale-[1.35] object-contain object-left"
          />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-semibold">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
            activeOptions={{ exact: true }}
          >
            Now showing
          </Link>
          <Link
            to="/snacks"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Snacks
          </Link>
          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            About
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <p className="island-kicker m-0 hidden lg:block">Beograd · Stari Grad</p>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
