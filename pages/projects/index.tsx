import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllProjects } from 'lib/api/api.projects'
import { Project, Language, ContentType } from 'gql-ts/wp-graphql'

type ProjectsProps = {
  projects?: Project[]
  languages?: Language[]
  contentType?: ContentType
}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { projects, languages, contentType } = props

  return (
    <Layout title="Projects" summary={contentType?.description}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: 'calc(var(--padding1) * 2)',
        }}
      >
        {projects?.map((node) => {
          const { uri, title, excerpt } = node

          return (
            <article
              key={uri}
              style={{
                border: 'solid 1px var(--gray2)',
                borderRadius: 'var(--borderRad2)',
                padding: 'var(--padding1)',
                boxShadow: 'var(--elev1)',
              }}
            >
              <Link href={uri || ''}>
                <h2>
                  <a>{title}</a>
                </h2>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: excerpt || '' }} />
              {languages && (
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
              )}
            </article>
          )
        })}
      </div>
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
