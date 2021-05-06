import { request, gql } from 'graphql-request'

const API_URL = process.env.WP_API_URL as string

export async function getAllPosts() {
  const data = await request(
    API_URL,
    gql`
      query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              date
              title
              slug
              excerpt
            }
          }
        }
      }
    `
  )

  return data?.posts
}

export async function getPost(slug: string) {
  const data = await request(
    API_URL,
    gql`
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
          content
        }
      }
      fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    }
  )

  return data
}

export async function getAllPostsWithSlug() {
  const data = await request(
    API_URL,
    gql`
      query AllPostsWithSlug {
        posts(first: 25) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )

  return data?.posts
}

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
