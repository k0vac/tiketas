import catalog from './data/movies.json' with { type: 'json' }
import type { MovieProfile } from './types.ts'

export type { MovieCastMember, MovieProfile, MovieTrailer } from './types.ts'

export const movies = catalog as Array<MovieProfile>

export function getMovieBySlug(slug: string) {
  return movies.find((movie) => movie.slug === slug)
}

export function getMovieById(id: number) {
  return movies.find((movie) => movie.id === id)
}
