import { request } from 'graphql-request'

import allProjects from 'lib/gql-queries/projects/AllProjects.graphql'
import projectBySlug from 'lib/gql-queries/projects/ProjectBySlug.graphql'
import allProjectsWithSlug from 'lib/gql-queries/projects/AllProjectsWithSlug.graphql'
import {
  Project,
  RootQuery,
  RootQueryToProjectConnection,
  RootQueryToLanguageConnection,
} from 'gql-ts/wp-graphql'

const API_URL = process.env.WP_API_URL as string

export async function getAllProjects() {
  const data = await request(API_URL, allProjects)

  return data
}

export const getProject = async (
  slug: string | string[]
): Promise<{ project: Project; languages: RootQueryToLanguageConnection }> => {
  const data = await request(API_URL, projectBySlug, {
    id: slug,
    idType: 'SLUG',
  })

  return data
}

export const getAllProjectsWithSlug = async (): Promise<RootQueryToProjectConnection | null> => {
  const data: RootQuery = await request(API_URL, allProjectsWithSlug)

  return data.projects || null
}
