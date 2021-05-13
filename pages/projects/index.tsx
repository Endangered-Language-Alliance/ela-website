import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllProjects } from 'lib/api/api.projects'
import { Project, Language } from 'gql-ts/wp-graphql'
import Image from 'next/image'

type ProjectsProps = {
  projects?: Project[]
  languages?: Language[]
}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { projects, languages } = props

  return (
    <div>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1>Projects</h1>
        <p>Pretend it's a map...</p>
        <hr />
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: 'calc(var(--padding) * 2)',
          }}
        >
          {projects?.map((node) => {
            const { uri, title, excerpt, featuredImage } = node

            return (
              <article
                key={uri}
                style={{
                  border: 'solid 1px var(--lightGray)',
                  borderRadius: 'var(--borderRad-1)',
                  padding: 'var(--padding)',
                  boxShadow: 'var(--elev-1)',
                }}
              >
                <Link href={uri || ''}>
                  <h2>
                    <a>
                      {title}
                      {featuredImage?.node?.sourceUrl && (
                        <div
                          style={{
                            position: 'relative',
                            width: 150,
                            height: 150,
                            borderRadius: 'var(--borderRad-1)',
                          }}
                        >
                          <Image
                            src={featuredImage?.node.sourceUrl || ''}
                            alt={featuredImage?.node?.altText || ''}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                    </a>
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
        </section>
      </Layout>
    </div>
  )
}

export default Projects

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProjects()

  return {
    props: {
      projects: data?.projects?.nodes,
      languages: data?.languages?.nodes,
    },
  }
}
