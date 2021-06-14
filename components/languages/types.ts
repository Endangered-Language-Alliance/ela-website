import {
  LangLocation_Languagelocation,
  Language_Custominfo_External,
  Project,
  ContentType,
  Language,
  LangLocation,
} from 'gql-ts/wp-graphql'

import { PreppedMarker, MarkerIconProps } from 'components/map/types'

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

export type GroupProps = {
  name: string
  color: string
  noGrid?: boolean
}

export type GroupConfig = {
  name: string
  color: string
  items: GroupConfigItem[]
  href?: string
}

export type GroupConfigItem = ItemProps & {
  markers: MarkerIconProps[]
}

export type GroupsProps = {
  groups: GroupConfig[]
}

export type ItemProps = {
  title: string
  subtitle: string
  href: string
}

export type ItemIconProps = {
  label: string | number
  color: string
  /** Crappy override to make it useful in non-map scenario */
  noTransform?: boolean
}

export type KnownLangLocation = Omit<
  LangLocation_Languagelocation,
  'continent'
> & {
  continent: Continent | string
}

export type LangInstancePageProps = { data?: LangWithKnownContinent }

export type LangLocWithKnownContinent = LangLocation & {
  languageLocation: LangLocation_Languagelocation & {
    continent: Continent
  }
}

export type LangWithKnownContinent = Omit<Language, 'langLocations'> & {
  langLocations: {
    nodes: LangLocWithKnownContinent[]
  }
}
