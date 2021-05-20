import {
  Language_Custominfo_External,
  Project,
  ContentType,
  Language,
} from 'gql-ts/wp-graphql'

export type LanguagesProps = {
  data: {
    contentType: ContentType
    languages: Language[]
  }
}

export type LanguagesListProps = {
  languages: Language[]
}

export type LangInstanceLinksListProps = {
  external?: null | Language_Custominfo_External
  project?: null | Project
}
