import { request } from 'graphql-request'

import { Page, Post, RootQueryToPageConnection } from 'gql-ts/wp-graphql'
import homePageQuery from 'lib/gql-queries/home/HomePageQuery.graphql'
import publishedPagesQuery from 'lib/gql-queries/home/PublishedPages.graphql'
import getPageQuery from 'lib/gql-queries/home/GetPage.graphql'

const API_URL = process.env.WP_API_URL as string

export async function getHomePageContent() {
  const data = await request<{
    data: { homePageContent: Page; posts: Post[] }
  }>(API_URL, homePageQuery)

  return data
}

export async function getPublishedPages(): Promise<RootQueryToPageConnection> {
  const response = await request<{
    data: { pages: RootQueryToPageConnection }
  }>(API_URL, publishedPagesQuery)

  return response?.data?.pages
}

export const getPage = async (
  uri: string | string[]
): Promise<{ page: Page }> => {
  const data = await request(API_URL, getPageQuery, {
    id: uri,
    idType: 'URI',
  })

  return data?.page
}
