import getConfig from 'next/config'
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

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

export async function getAllProjects() {
  const data = await request(wpGqlEndpoint, allProjects)

  return data
}

export const getProject = async (
  slug: string | string[]
): Promise<{ project: Project; languages: RootQueryToLanguageConnection }> => {
  const data = await request(wpGqlEndpoint, projectBySlug, { id: slug })

  return data
}

export const getAllProjectsWithSlug = async (): Promise<RootQueryToProjectConnection | null> => {
  const data: RootQuery = await request(wpGqlEndpoint, allProjectsWithSlug)

  return data.projects || null
}
