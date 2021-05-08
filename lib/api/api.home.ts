import { request } from 'graphql-request'

import { Page, Post } from 'gql-ts/wp-graphql'
import homePageQuery from '../../pages/HomePageQuery.graphql'

const API_URL = process.env.WP_API_URL as string

export async function getHomePageContent() {
  const data = await request<{
    data: { meat: Page; posts: Post[] }
  }>(API_URL, homePageQuery)

  return data
}
