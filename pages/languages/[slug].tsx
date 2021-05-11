import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import '@reach/tabs/styles.css'

import { getAllLangsWithSlug, getLanguage } from 'lib/api/api.languages'
import { Layout } from 'components/Layout'
import { Language as LanguageType } from 'gql-ts/wp-graphql'

import styles from 'styles/Home.module.css'
import Link from 'next/link'

const Language: React.FC<{ data?: LanguageType }> = (props) => {
  const { data } = props

  if (!data) return <p>No data could be found for this language...</p>

  const { title, excerpt, featuredImage } = data || {}
  const { customInfo, youTubePlaylist } = data || {}
  const { project, external, background, affiliation, endangerment } =
    customInfo || {}
  const { langStructure, academicWork, addlInfo } = customInfo || {}
  const { elaWork, inNewYork } = customInfo || {}
  const { archiveOrgLink, glottolog, nycLangMap } = external || {}
  const { archiveOrgPlaylistId, gDriveDocId } = external || {}

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <article style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>{title}</h1>
          {customInfo?.endonym && <p>{customInfo.endonym}</p>}
          <div dangerouslySetInnerHTML={{ __html: excerpt || '' }} />
          {featuredImage?.node?.sourceUrl && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 300,
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
          <Tabs>
            <TabList>
              <Tab>Background</Tab>
              {langStructure && <Tab>Language Structure</Tab>}
              {academicWork && <Tab>Academic Work</Tab>}
              {(elaWork || inNewYork) && <Tab>Workness</Tab>}
              {addlInfo && <Tab>More Info</Tab>}
            </TabList>
            <TabPanels>
              <TabPanel>
                {youTubePlaylist?.id && (
                  <p>
                    YouTube playlist ID (will be used in tandem with YouTube API
                    to create thumbs): <code>{youTubePlaylist.id}</code>
                  </p>
                )}
                {archiveOrgPlaylistId && (
                  <iframe
                    src={`https://archive.org/embed/${archiveOrgPlaylistId}`}
                    width="500"
                    height="140"
                    frameBorder="0"
                    title="Archive.org playlist"
                    allowFullScreen
                  />
                )}
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'grid',
                    gridColumnGap: 'var(--padding)',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(150px, auto))',
                    justifyContent: 'center',
                  }}
                >
                  {project && (
                    <li>
                      <Link href={project.uri || ''}>
                        <a>Project: {project.title}</a>
                      </Link>
                    </li>
                  )}
                  {archiveOrgLink && (
                    <li>
                      <a href={archiveOrgLink}>Archive.org</a>
                    </li>
                  )}
                  {glottolog && (
                    <li>
                      <a href={glottolog}>Glottolog</a>
                    </li>
                  )}
                  {nycLangMap && (
                    <li>
                      <a href={nycLangMap}>Languages of NYC Map</a>
                    </li>
                  )}
                </ul>
                {gDriveDocId && (
                  <iframe
                    src={`https://drive.google.com/file/d/${gDriveDocId}/preview`}
                    width="100%"
                    height={480}
                    title="Google Drive Embedded Preview"
                  />
                )}
                <div dangerouslySetInnerHTML={{ __html: background || '' }} />
                {affiliation && (
                  <section>
                    <h3>Affiliation</h3>
                    <div dangerouslySetInnerHTML={{ __html: affiliation }} />
                  </section>
                )}
                {endangerment && (
                  <section>
                    <h3>Endangerment</h3>
                    <div dangerouslySetInnerHTML={{ __html: endangerment }} />
                  </section>
                )}
              </TabPanel>
              {langStructure && (
                <TabPanel>
                  <div dangerouslySetInnerHTML={{ __html: langStructure }} />
                </TabPanel>
              )}
              {academicWork && (
                <TabPanel>
                  <div dangerouslySetInnerHTML={{ __html: academicWork }} />
                </TabPanel>
              )}
              {(elaWork || inNewYork) && (
                <TabPanel>
                  {elaWork && (
                    <section>
                      <h3>ELA's work</h3>
                      <div dangerouslySetInnerHTML={{ __html: elaWork }} />
                    </section>
                  )}
                  {inNewYork && (
                    <section>
                      <h3>In New York</h3>
                      <p>
                        <b>
                          @Ross would this maybe be a better spot for the NYC
                          map link? Or are there scenarios where this section
                          doesn't exist but a link does?
                        </b>
                      </p>
                      <div dangerouslySetInnerHTML={{ __html: inNewYork }} />
                    </section>
                  )}
                </TabPanel>
              )}
              {addlInfo && (
                <TabPanel>
                  <div dangerouslySetInnerHTML={{ __html: addlInfo }} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </article>
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  const allLangs = await getAllLangsWithSlug()

  return {
    paths:
      allLangs?.edges?.map((edge) => {
        const { node } = edge || {}

        return node?.uri
      }) || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getLanguage(params?.slug || '')

  return {
    props: {
      data,
    },
  }
}

export default Language
