import getConfig from 'next/config'
import { request } from 'graphql-request'

import { Page, Post, RootQueryToPageConnection } from 'gql-ts/wp-graphql'
import homePageQuery from 'lib/gql-queries/home/HomePageQuery.graphql'
import publishedPagesQuery from 'lib/gql-queries/home/PublishedPages.graphql'
import getPageQuery from 'lib/gql-queries/home/GetPage.graphql'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

// TODO: type this out. Should match HomeProps in pages/index.tsx
export async function getHomePageContent() {
  const data = await request<{
    data: { homePageContent: Page; posts: Post[] }
  }>(wpGqlEndpoint, homePageQuery)

  return data
}

export async function getPublishedPages(): Promise<RootQueryToPageConnection> {
  const response = await request<{ pages: RootQueryToPageConnection }>(
    wpGqlEndpoint,
    publishedPagesQuery
  )

  return response?.pages // super important to TYPE THE RIGHT CODE
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
