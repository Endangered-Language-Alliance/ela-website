import { request } from 'graphql-request'
import getConfig from 'next/config'
import { useQuery, UseQueryResult } from 'react-query'
import {
  RootQueryToPostConnection,
  RootQueryToLanguageConnection,
  RootQueryToPageConnection,
  RootQueryToProjectConnection,
} from 'gql-ts/wp-graphql'
import SitewideSearchQuery from './SitewideSearch.graphql'

const {
  publicRuntimeConfig: { wpGqlEndpoint },
} = getConfig()

export type SearchResultsType = {
  languages: RootQueryToLanguageConnection
  projects: RootQueryToProjectConnection
  posts: RootQueryToPostConnection
  pages: RootQueryToPageConnection
}

export const useSearchQuery = (
  searchTerm: string,
  queryArg = 'q'
): UseQueryResult<SearchResultsType> => {
  return useQuery(['search', searchTerm], async () => {
    const resp = await request(wpGqlEndpoint, SitewideSearchQuery, {
      [queryArg]: searchTerm,
    })

    return resp
  })
}
