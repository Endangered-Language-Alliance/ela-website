import { GetStaticPaths, GetStaticProps } from 'next'

import { getAllProjectsWithSlug, getProject } from 'lib/api/api.projects'
import { Layout } from 'components/Layout'
import { Project, Language } from 'gql-ts/wp-graphql'
import { getCitiesCoords } from 'components/map/utils'
import mapStyles from 'components/map/Map.module.css'
import { Map } from 'components/map/Map'
import { LanguagesList } from 'components/languages/LanguagesList'

type ProjectInstanceProps = {
  project?: Project
  languages?: Language[]
}

const ProjectInstance: React.FC<ProjectInstanceProps> = (props) => {
  const { project, languages } = props

  if (!project)
    return (
      <Layout
        title="Not found"
        summary="No data could be found for this project..."
      />
    )

  const { title, content, uri, customExcerpt, youTubePlaylist } = project || {}
  const langsInThisProject = (languages || []).filter(
    (lang) => lang?.customInfo?.project?.uri === uri
  )
  const preppedData = getCitiesCoords(langsInThisProject)

  return (
    <Layout
      title={title}
      summary={customExcerpt?.excerpt}
      youTubePlaylistId={youTubePlaylist?.id}
      tweenerContent={
        <div className={mapStyles.fullWidthMap}>
          <Map preppedData={preppedData} />
        </div>
      }
    >
      <LanguagesList languages={langsInThisProject} />
      <div dangerouslySetInnerHTML={{ __html: content || '' }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allProjects = await getAllProjectsWithSlug()

  return {
    paths:
      allProjects?.edges?.map((edge) => {
        const { node } = edge || {}

        return node?.uri || ''
      }) || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getProject(params?.slug || '')

  return {
    props: {
      project: data?.project,
      languages: data?.languages?.nodes,
    },
    revalidate: 15,
  }
}

export default ProjectInstance
