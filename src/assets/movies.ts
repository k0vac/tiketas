import catalog from './data/movies.json' with { type: 'json' }
import { withBase } from '#/lib/paths.ts'
import type { MovieProfile } from './types.ts'

export type { MovieCastMember, MovieProfile, MovieTrailer } from './types.ts'

export const movies = (catalog as Array<MovieProfile>).map((movie) => ({
  ...movie,
  poster: withBase(movie.poster),
  backdrop: withBase(movie.backdrop),
}))

export function getMovieBySlug(slug: string) {
  return movies.find((movie) => movie.slug === slug)
}

export function getMovieById(id: number) {
  return movies.find((movie) => movie.id === id)
}
