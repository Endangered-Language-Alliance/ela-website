import {
  ContentType,
  Project,
  RootQuery,
  RootQueryToLanguageConnection,
  RootQueryToProjectConnection,
} from 'gql-ts/wp-graphql'
import { request } from 'graphql-request'
import allProjects from 'lib/gql-queries/projects/AllProjects.graphql'
import allProjectsWithSlug from 'lib/gql-queries/projects/AllProjectsWithSlug.graphql'
import projectBySlug from 'lib/gql-queries/projects/ProjectBySlug.graphql'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

type AllProjects = {
  contentType: ContentType | null
  projects: RootQueryToProjectConnection
  languages: RootQueryToLanguageConnection
}

export async function getAllProjects(): Promise<AllProjects> {
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
