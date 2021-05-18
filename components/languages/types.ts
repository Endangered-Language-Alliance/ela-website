import { ContentType, Language } from 'gql-ts/wp-graphql'

export type LanguagesProps = {
  data: {
    contentType: ContentType
    languages: Language[]
  }
}
