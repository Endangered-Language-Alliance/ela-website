// TODO: rename file to [uri].tsx, adapt code
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import '@reach/tabs/styles.css'

import { getAllLangsWithSlug, getLanguage } from 'lib/api/api.languages'
import { Layout } from 'components/Layout'
import { LoadingLayout } from 'components/LoadingLayout'
import { YouTubePlaylist } from 'components/video/YouTubePlaylist'
import { Language as LanguageType } from 'gql-ts/wp-graphql'

import styles from 'styles/Home.module.css'
import Link from 'next/link'

const Language: React.FC<{ data?: LanguageType }> = (props) => {
  const { data } = props
  const router = useRouter()

  // Not sure if necessary. Docs:
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  if (router.isFallback) return <LoadingLayout />

  if (!data) return <p>No data could be found for this language...</p>

  const { title, excerpt, customInfo, youTubePlaylist } = data || {}
  const { project, external, background, affiliation, endangerment } =
    customInfo || {}
  const { langStructure, prevResearch, addlInfo } = customInfo || {}
  const { elaWork, inNewYork } = customInfo || {}
  const { archiveOrgLink, glottologId, nycLangMap } = external || {}
  const { gDriveDocId } = external || {}

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <article style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>{title}</h1>
          {customInfo?.endonym && <p>{customInfo.endonym}</p>}
          <div dangerouslySetInnerHTML={{ __html: excerpt || '' }} />
          <p>Pretend it's a map...</p>
          <hr />
          {youTubePlaylist?.id && (
            <YouTubePlaylist playlistId={youTubePlaylist.id} />
          )}
          <ul
            style={{
              listStyle: 'none',
              display: 'grid',
              gridColumnGap: 'var(--padding1)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, auto))',
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
            {nycLangMap && (
              <li>
                <a href={nycLangMap}>Languages of NYC Map</a>
              </li>
            )}
          </ul>
          <Tabs>
            <TabList>
              <Tab>Background</Tab>
              {langStructure && <Tab>Language Structure</Tab>}
              {(glottologId || prevResearch) && <Tab>Previous Research</Tab>}
              {elaWork && <Tab>ELA's Work</Tab>}
              {inNewYork && <Tab>In New York</Tab>}
              {addlInfo && <Tab>More Info</Tab>}
            </TabList>
            <TabPanels>
              <TabPanel>
                <div dangerouslySetInnerHTML={{ __html: background || '' }} />
                {affiliation && (
                  <div>
                    <h3>Affiliation</h3>
                    <div dangerouslySetInnerHTML={{ __html: affiliation }} />
                  </div>
                )}
                {endangerment && (
                  <div>
                    <h3>Endangerment</h3>
                    <div dangerouslySetInnerHTML={{ __html: endangerment }} />
                  </div>
                )}
              </TabPanel>
              {langStructure && (
                <TabPanel>
                  <div dangerouslySetInnerHTML={{ __html: langStructure }} />
                </TabPanel>
              )}
              {(glottologId || prevResearch) && (
                <TabPanel>
                  {glottologId && (
                    <a
                      target="_blank"
                      href={`https://glottolog.org/resource/languoid/id/${glottologId}`}
                      rel="noreferrer"
                    >
                      Glottolog
                    </a>
                  )}
                  {prevResearch && (
                    <div dangerouslySetInnerHTML={{ __html: prevResearch }} />
                  )}
                </TabPanel>
              )}
              {(elaWork || gDriveDocId) && (
                <TabPanel>
                  <p>
                    <b>
                      @Ross would this maybe be a better spot for the Project
                      link? Or BOTH spots perhaps, since it's important?
                    </b>
                  </p>
                  {elaWork && (
                    <div dangerouslySetInnerHTML={{ __html: elaWork }} />
                  )}
                  {gDriveDocId && (
                    <>
                      <h4>Texts</h4>
                      <iframe
                        src={`https://drive.google.com/file/d/${gDriveDocId}/preview`}
                        width="100%"
                        height={480}
                        title="Google Drive Embedded Preview"
                      />
                    </>
                  )}
                </TabPanel>
              )}
              {inNewYork && (
                <TabPanel>
                  <div>
                    <h3>In New York</h3>
                    <p>
                      <b>
                        @Ross would this maybe be a better spot for the NYC map
                        link? Or are there scenarios where this section doesn't
                        exist but a link does?
                      </b>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: inNewYork }} />
                  </div>
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
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allLangs = await getAllLangsWithSlug()

  return {
    paths:
      allLangs?.edges?.map((edge) => {
        const { node } = edge || {}

        return node?.uri || ''
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
    revalidate: 10,
  }
}

export default Language
