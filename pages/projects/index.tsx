import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { Map } from 'components/map/Map'
import { getAllProjects } from 'lib/api/api.projects'
import { Project, ContentType, Language } from 'gql-ts/wp-graphql'
import { prepProjectsGroups, prepProjectsMarkers } from 'components/map/utils'
import { ProjectGroups } from 'components/projects/ProjectsLanding'
import { LangWithKnownContinent } from 'components/languages/types'

type ProjectsProps = {
  projects?: Project[]
  languages?: LangWithKnownContinent[]
  contentType?: ContentType
}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { projects, languages, contentType } = props

  const langsTS = languages || ([] as Language[])
  const projectsTS = projects || ([] as Project[])

  const preppedMarkerData = prepProjectsMarkers(langsTS, projectsTS)
  const projectsGroups = prepProjectsGroups(projectsTS, langsTS)

  return (
    <Layout title="Projects" summary={contentType?.description}>
      <Map preppedMarkerData={preppedMarkerData} />
      <ProjectGroups groups={projectsGroups} />
    </Layout>
  )
}

export default Projects

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProjects()

  return {
    props: {
      projects: data?.projects?.nodes,
      languages: data?.languages?.nodes,
      contentType: data?.contentType,
    },
    revalidate: 15,
  }
}
