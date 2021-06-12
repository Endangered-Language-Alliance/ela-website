import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { Map } from 'components/map/Map'
import { getAllProjects } from 'lib/api/api.projects'
import { Project, ContentType } from 'gql-ts/wp-graphql'
import { prepProjectsGroups, prepCitiesMarkers } from 'components/map/utils'
import { ProjectGroups } from 'components/languages/LandingGroups'
import { LangWithKnownContinent } from 'components/languages/types'

type ProjectsProps = {
  projects?: Project[]
  languages?: LangWithKnownContinent[]
  contentType?: ContentType
}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { projects, languages, contentType } = props
  const preppedMapData = prepCitiesMarkers(
    languages as LangWithKnownContinent[]
  )
  const projectsGroups = prepProjectsGroups(
    projects || ([] as Project[]),
    languages || ([] as LangWithKnownContinent[])
  )

  return (
    <Layout title="Projects" summary={contentType?.description}>
      <Map preppedData={preppedMapData} />
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
