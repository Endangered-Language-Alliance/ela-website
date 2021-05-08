import { request } from 'graphql-request'

import allPosts from './QueryAllPosts.graphql'
import postBySlug from './QueryGetPost.graphql'
import allPostsWithSlug from './QueryAllPostsWithSlug.graphql'

const API_URL = process.env.WP_API_URL as string

export async function getAllPosts() {
  const data = await request(API_URL, allPosts)

  return data?.posts
}

export async function getPost(slug: string) {
  const data = await request(API_URL, postBySlug, {
    id: slug,
    idType: 'SLUG',
  })

  return data
}

export async function getAllPostsWithSlug() {
  const data = await request(API_URL, allPostsWithSlug)

  return data?.posts
}
