import { request } from 'graphql-request'

import allLanguages from 'lib/gql-queries/languages/AllLanguages.graphql'
import languageBySlug from 'lib/gql-queries/languages/LanguageBySlug.graphql'
import allLangsWithSlug from 'lib/gql-queries/languages/AllLangsWithSlug.graphql'
import {
  Language,
  RootQuery,
  RootQueryToLanguageConnection,
} from 'gql-ts/wp-graphql'

const API_URL = process.env.WP_API_URL as string

export async function getAllLanguages() {
  const data = await request(API_URL, allLanguages)

  return data?.languages.edges
}

export const getLanguage = async (
  slug: string | string[]
): Promise<Language> => {
  const data = await request(API_URL, languageBySlug, {
    id: slug,
    idType: 'SLUG',
  })

  return data?.language
}

export const getAllLangsWithSlug = async (): Promise<RootQueryToLanguageConnection | null> => {
  const data: RootQuery = await request(API_URL, allLangsWithSlug)

  return data.languages || null
}
