import { request } from 'graphql-request'

import allPosts from './gql/QueryAllPosts.graphql'
import postBySlug from './gql/QueryGetPost.graphql'
import allPostsWithSlug from './gql/QueryAllPostsWithSlug.graphql'

import { Post, RootQuery, RootQueryToPostConnection } from '../../wp-graphql'

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
