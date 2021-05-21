import {
  LangLocation_Languagelocation,
  Language_Custominfo_External,
  Project,
  ContentType,
  Language,
} from 'gql-ts/wp-graphql'

import { PreppedMarker } from 'components/map/types'

export type LanguagesProps = {
  data: {
    contentType: ContentType
    languages: LangWithKnownContinent[]
  }
}

export type LanguagesListProps = {
  languages: Language[]
}

export type LangInstanceLinksListProps = {
  external?: null | Language_Custominfo_External
  project?: null | Project
}

export type Continent = 'Africa' | 'Americas' | 'Asia' | 'Europe'

export type ContinentColors = {
  [key in Continent]: string
}

export type ContinentGroup = {
  [key in Continent]: PreppedMarker[]
}

export type KnownLangLocation = Omit<
  LangLocation_Languagelocation,
  'continent'
> & {
  continent: Continent
}

export type LangWithKnownContinent = Omit<Language, 'langLocations'> & {
  langLocations: {
    nodes: KnownLangLocation[]
  }
}

export type LangInstancePageProps = { data?: LangWithKnownContinent }
