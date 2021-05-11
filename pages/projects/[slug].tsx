import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { getAllProjectsWithSlug, getProject } from 'lib/api/api.projects'
import { Layout } from 'components/Layout'
import { Project } from 'gql-ts/wp-graphql'

import styles from 'styles/Home.module.css'
import blogStyles from 'styles/Blog.module.css'

const ProjectInstance: React.FC<{ projectData?: Project }> = (props) => {
  const { projectData } = props

  if (!projectData) <p>No data could be found for the project...</p>

  const { title, content, excerpt } = projectData || {}

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <article className={blogStyles.article}>
          <div className={blogStyles.postmeta}>
            <h1 className={styles.title}>{title}</h1>
          </div>
          {excerpt && (
            <div
              className="post-content content"
              dangerouslySetInnerHTML={{ __html: excerpt || '' }}
            />
          )}
          <div
            className="post-content content"
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        </article>
      </Layout>
    </div>
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
      projectData: data,
    },
  }
}

export default ProjectInstance
