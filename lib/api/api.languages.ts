import getConfig from 'next/config'
import { request } from 'graphql-request'

import allLanguages from 'lib/gql-queries/languages/AllLanguages.graphql'
import languageBySlug from 'lib/gql-queries/languages/LanguageBySlug.graphql'
import allLangsWithSlug from 'lib/gql-queries/languages/AllLangsWithSlug.graphql'
import {
  Language,
  RootQuery,
  RootQueryToLanguageConnection,
} from 'gql-ts/wp-graphql'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

export async function getAllLanguages() {
  const data = await request(wpGqlEndpoint, allLanguages)

  return { languages: data?.languages?.nodes, contentType: data?.contentType }
}

export const getLanguage = async (
  slug: string | string[]
): Promise<Language> => {
  const data = await request(wpGqlEndpoint, languageBySlug, {
    id: slug,
    idType: 'SLUG',
  })

  return data?.language
}

export const getAllLangsWithSlug = async (): Promise<RootQueryToLanguageConnection | null> => {
  const data: RootQuery = await request(wpGqlEndpoint, allLangsWithSlug)

  return data.languages || null
}
