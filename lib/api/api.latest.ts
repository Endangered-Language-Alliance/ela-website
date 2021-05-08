import { request } from 'graphql-request'

import { Post, RootQuery, RootQueryToPostConnection } from 'gql-ts/wp-graphql'

import allPosts from 'lib/gql-queries/blog/QueryAllPosts.graphql'
import postBySlug from 'lib/gql-queries/blog/QueryGetPost.graphql'
import allPostsWithSlug from 'lib/gql-queries/blog/QueryAllPostsWithSlug.graphql'

const API_URL = process.env.WP_API_URL as string

export async function getAllPosts() {
  const data = await request(API_URL, allPosts)

  return data?.posts
}

export const getPost = async (slug: string | string[]): Promise<Post> => {
  const data = await request(API_URL, postBySlug, {
    id: slug,
    idType: 'SLUG',
  })

  return data?.post
}

export const getAllPostsWithSlug = async (): Promise<RootQueryToPostConnection | null> => {
  const data: RootQuery = await request(API_URL, allPostsWithSlug)

  return data.posts || null
}
