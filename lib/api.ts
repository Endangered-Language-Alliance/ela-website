import { request, gql } from 'graphql-request'

import homePageQuery from '../pages/HomePageQuery.graphql'
import { Page, Post } from '../wp-graphql'

const API_URL = process.env.WP_API_URL as string

export async function getAllLanguages() {
  const data = await request(
    API_URL,
    gql`
      query AllLanguages {
        languages {
          edges {
            node {
              title
              excerpt
              slug
            }
          }
        }
      }
    `
  )

  return data?.languages
}

export async function getHomePageContent() {
  const data = await request<{
    data: { meat: Page; posts: Post[] }
  }>(API_URL, homePageQuery)

  return data
}
