import { existsSync } from 'node:fs'
import { createLogger, defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import movies from './src/assets/data/movies.json' with { type: 'json' }

const logger = createLogger()
const warn = logger.warn.bind(logger)
const warnOnce = logger.warnOnce.bind(logger)

function isUseClientDirectiveWarning(message: string) {
  return (
    message.includes('MODULE_LEVEL_DIRECTIVE') && message.includes('use client')
  )
}

logger.warn = (message, options) => {
  if (isUseClientDirectiveWarning(message)) return
  warn(message, options)
}

logger.warnOnce = (message, options) => {
  if (isUseClientDirectiveWarning(message)) return
  warnOnce(message, options)
}

function normalizeBase(value: string) {
  if (!value || value === '/') return '/'
  return value.endsWith('/') ? value : `${value}/`
}

function githubPagesBase() {
  // Custom domains (CNAME) are served from the host root, not /repo-name/.
  if (existsSync('CNAME') || existsSync('public/CNAME')) {
    return '/'
  }

  if (Object.hasOwn(process.env, 'VITE_BASE_PATH')) {
    return normalizeBase(process.env.VITE_BASE_PATH || '/')
  }

  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (
    (process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true') &&
    repo &&
    !repo.endsWith('.github.io')
  ) {
    return `/${repo}/`
  }

  return '/'
}

const base = githubPagesBase()
const routerBasepath = base === '/' ? '/' : base.replace(/\/$/, '')

const moviePages = movies.map((movie) => ({
  path: `/movies/${movie.slug}`,
}))

const config = defineConfig({
  base,
  customLogger: logger,
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart({
      router: {
        basepath: routerBasepath,
      },
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: true,
        },
      },
      pages: [
        { path: '/' },
        { path: '/about' },
        { path: '/snacks' },
        ...moviePages,
      ],
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        concurrency: 8,
      },
    }),
    viteReact(),
  ],
})

export default config
