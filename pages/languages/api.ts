import { request, gql } from 'graphql-request'

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

  return data?.languages.edges
}
