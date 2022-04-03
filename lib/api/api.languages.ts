import getConfig from 'next/config'
import { request } from 'graphql-request'

import allLanguages from 'lib/gql-queries/languages/AllLanguages.graphql'
import languageBySlug from 'lib/gql-queries/languages/LanguageBySlug.graphql'
import allLangsWithSlug from 'lib/gql-queries/languages/AllLangsWithSlug.graphql'
import {
  RootQuery,
  RootQueryToLanguageConnection,
  ContentType,
} from 'gql-ts/wp-graphql'
import { LangWithKnownContinent } from 'components/languages/types'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

type AllLangsResponse = {
  languages: RootQueryToLanguageConnection | null
  contentType: ContentType | null
}

export async function getAllLanguages(): Promise<AllLangsResponse> {
  const data = await request(wpGqlEndpoint, allLanguages)

  return { languages: data?.languages?.nodes, contentType: data?.contentType }
}

export const getLanguage = async (
  slug: string | string[]
): Promise<LangWithKnownContinent> => {
  const data = await request(wpGqlEndpoint, languageBySlug, { id: slug })

  return data?.language
}

export const getAllLangsWithSlug = async (): Promise<RootQueryToLanguageConnection | null> => {
  const data: RootQuery = await request(wpGqlEndpoint, allLangsWithSlug)

  return data.languages || null
}
