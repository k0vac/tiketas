import concessionsJson from '#/assets/data/concessions.json' with { type: 'json' }
import screeningsJson from '#/assets/data/screenings.json' with { type: 'json' }
import { movies } from '#/assets/movies.ts'
import type { MovieProfile } from '#/assets/types.ts'
import { withBase } from '#/lib/paths.ts'

export type TicketPrices = {
  regular: number
  student: number
  vip: number
}

export type Screening = {
  id: string
  movieId: number
  date: string
  time: string
  hall: string
  language: string
  subtitles: string
  capacity: number
  availableSeats: number
  prices: TicketPrices
}

export type Concession = {
  id: number
  slug: string
  title: string
  subtitle?: string
  description: string
  price: number
  image: string
}

export type CinemaInfo = {
  name: string
  tagline: string
  city: string
  address: string
  district: string
  phone: string
}

type ScreeningsFile = {
  cinema: CinemaInfo
  timezone: string
  today: string
  currency: string
  ticketTypes: Array<{ id: keyof TicketPrices; label: string; labelSr: string }>
  screenings: Array<Screening>
}

const schedule = screeningsJson as ScreeningsFile

export const cinema = schedule.cinema
export const cinemaToday = schedule.today
export const ticketTypes = schedule.ticketTypes
export const screenings = schedule.screenings
export const concessions = (concessionsJson as Array<Concession>).map(
  (item) => ({
    ...item,
    image: withBase(item.image) ?? item.image,
  }),
)

export const SAMPLE_TRAILER_KEY = 'aqz-KE-bpKQ'

export function getMovieScreenings(movieId: number) {
  return screenings
    .filter((screening) => screening.movieId === movieId)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
}

export function getNextScreening(movieId: number) {
  return (
    getMovieScreenings(movieId).find(
      (screening) => screening.date >= cinemaToday,
    ) ?? null
  )
}

export function getUpcomingDates(movieId: number, limit = 4) {
  const dates: Array<string> = []
  for (const screening of getMovieScreenings(movieId)) {
    if (screening.date < cinemaToday) continue
    if (!dates.includes(screening.date)) {
      dates.push(screening.date)
    }
    if (dates.length >= limit) break
  }
  return dates
}

export function getFeaturedMovie(): MovieProfile {
  const seed = Number(cinemaToday.replaceAll('-', ''))
  const playing = movies.filter((movie) => getNextScreening(movie.id))
  const pool = playing.length > 0 ? playing : movies
  const featured = pool[seed % pool.length]
  if (!featured) {
    throw new Error('No movies are loaded for the Tiketas programme.')
  }
  return featured
}

export function getTrailerKey(movie: MovieProfile) {
  if (movie.trailer?.site === 'YouTube' && movie.trailer.key) {
    return movie.trailer.key
  }
  return SAMPLE_TRAILER_KEY
}

export function formatRsd(amount: number) {
  return new Intl.NumberFormat('sr-RS', {
    style: 'currency',
    currency: 'RSD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDateLabel(isoDate: string, style: 'short' | 'long' = 'short') {
  const date = new Date(`${isoDate}T12:00:00`)
  if (style === 'long') {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date)
  }
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

export function formatRuntime(minutes: number | null) {
  if (!minutes) return 'Runtime TBA'
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  return `${hours}h ${rest.toString().padStart(2, '0')}m`
}

export function occupancyLabel(screening: Screening) {
  const taken = screening.capacity - screening.availableSeats
  const percent = Math.round((taken / screening.capacity) * 100)
  if (percent >= 90) return 'Almost full'
  if (percent >= 65) return 'Selling fast'
  return 'Seats open'
}

const LAST_SCREENING_KEY = 'tiketas-last-screening'

export function rememberScreening(id: string) {
  window.localStorage.setItem(LAST_SCREENING_KEY, id)
}

export function getRememberedScreening() {
  return window.localStorage.getItem(LAST_SCREENING_KEY)
}
