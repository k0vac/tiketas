export type MovieCastMember = {
  id: number
  name: string
  character: string
  order: number
}

export type MovieTrailer = {
  name: string
  key: string
  site: string
  type: string
}

export type MovieProfile = {
  id: number
  slug: string
  title: string
  originalTitle: string
  tagline: string | null
  overview: string | null
  releaseDate: string | null
  runtime: number | null
  status: string
  originalLanguage: string
  spokenLanguages: Array<string>
  genres: Array<string>
  certification: string | null
  voteAverage: number
  voteCount: number
  popularity: number
  budget: number | null
  revenue: number | null
  imdbId: string | null
  homepage: string | null
  poster: string | null
  backdrop: string | null
  directors: Array<string>
  writers: Array<string>
  cast: Array<MovieCastMember>
  trailer: MovieTrailer | null
  keywords: Array<string>
  productionCompanies: Array<string>
  productionCountries: Array<string>
}
