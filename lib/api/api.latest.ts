import getConfig from 'next/config'
import { request } from 'graphql-request'

import { Post, RootQuery, RootQueryToPostConnection } from 'gql-ts/wp-graphql'

import allPosts from 'lib/gql-queries/blog/QueryAllPosts.graphql'
import postsByYear from 'lib/gql-queries/blog/PostsByYear.graphql'
import queryGetPost from 'lib/gql-queries/blog/QueryGetPost.graphql'
import allPostsWithSlug from 'lib/gql-queries/blog/QueryAllPostsWithSlug.graphql'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

export async function getAllPosts() {
  const data = await request(wpGqlEndpoint, allPosts)

  return data?.posts
}

export const getPost = async (partialURI: string | string[]): Promise<Post> => {
  const data = await request(wpGqlEndpoint, queryGetPost, {
    id: partialURI,
    idType: 'URI',
  })

  return data?.post
}

export const getPostsByYear = async (
  year: number
): Promise<RootQueryToPostConnection | null> => {
  const data = await request(wpGqlEndpoint, postsByYear, {
    year,
  })

  return data.posts || null
}

export const getAllPostsWithSlug = async (): Promise<RootQueryToPostConnection | null> => {
  const data: RootQuery = await request(wpGqlEndpoint, allPostsWithSlug)

  return data.posts || null
}
