import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllProjects } from 'lib/api/api.projects'
import { Project, Language, ContentType } from 'gql-ts/wp-graphql'
import { prepProjectsGroups } from 'components/map/utils'
import { Groups } from 'components/languages/ContinentsGroups'

type ProjectsProps = {
  projects?: Project[]
  languages?: Language[]
  contentType?: ContentType
}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { projects, languages, contentType } = props
  const projectsGroups = prepProjectsGroups(
    projects || ([] as Project[]),
    languages || ([] as Language[])
  )

  return (
    <Layout title="Projects" summary={contentType?.description}>
      <Groups groups={projectsGroups} />
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
