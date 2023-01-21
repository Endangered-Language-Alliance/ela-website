import {
  Page,
  RootQueryToPageConnection,
  RootQueryToPostConnection,
} from 'gql-ts/wp-graphql'
import { request } from 'graphql-request'
import getPageQuery from 'lib/gql-queries/home/GetPage.graphql'
import homePageQuery from 'lib/gql-queries/home/HomePageQuery.graphql'
import publishedPagesQuery from 'lib/gql-queries/home/PublishedPages.graphql'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig
type Response = {
  data: {
    homePageContent: Page
    posts: RootQueryToPostConnection
  }
}

export async function getHomePageContent(): Promise<Response> {
  const data = await request(wpGqlEndpoint, homePageQuery)

  return data
}

export async function getPublishedPages(): Promise<RootQueryToPageConnection> {
  const response = await request<{ pages: RootQueryToPageConnection }>(
    wpGqlEndpoint,
    publishedPagesQuery
  )

  return response?.pages
}

export const getPage = async (
  uri: string | string[]
): Promise<{ page: Page }> => {
  const data = await request(wpGqlEndpoint, getPageQuery, {
    id: uri,
    idType: 'URI',
  })

  return data?.page
}
