import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { getAllProjectsWithSlug, getProject } from 'lib/api/api.projects'
import { Layout } from 'components/Layout'
import { Project, Language } from 'gql-ts/wp-graphql'

import blogStyles from 'styles/Blog.module.css'

type ProjectInstanceProps = {
  project?: Project
  languages?: Language[]
}

const ProjectInstance: React.FC<ProjectInstanceProps> = (props) => {
  const { project, languages } = props

  if (!project) <p>No data could be found for the project...</p>

  const { title, content, uri } = project || {}

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <article className={blogStyles.article}>
          <div className={blogStyles.postmeta}>
            <h1>{title}</h1>
          </div>
          {languages && (
            <>
              <h2>Languages in this project</h2>
              <p>Pretend it's a map...</p>
              <ul>
                {languages
                  .filter((lang) => lang?.customInfo?.project?.uri === uri)
                  .map((lang) => (
                    <li key={lang?.title}>
                      <Link href={lang?.uri || ''}>
                        <a>{lang?.title}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
          {content && (
            <>
              <h2>And then our old friend, the content</h2>
              <div
                className="post-content content"
                dangerouslySetInnerHTML={{ __html: content || '' }}
              />
            </>
          )}
        </article>
      </Layout>
    </>
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
