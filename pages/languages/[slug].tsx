import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import '@reach/tabs/styles.css'

import btnStyles from 'components/buttons/Button.module.css'
import langStyles from 'components/languages/Languages.module.css'
import sharedStyles from 'components/Layout.module.css'
import { getAllLangsWithSlug, getLanguage } from 'lib/api/api.languages'
import { Layout } from 'components/Layout'
import { YouTubePlaylist } from 'components/video/YouTubePlaylist'
import { Language as LanguageType } from 'gql-ts/wp-graphql'
import { LangInstanceLinksList } from 'components/languages/LangInstanceLinksList'

const Language: React.FC<{ data?: LanguageType }> = (props) => {
  const { data } = props
  const router = useRouter()

  // Not sure if necessary. Docs:
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  if (router.isFallback) return <Layout title="Loading..." />

  if (!data)
    return (
      <Layout
        title="Not found"
        summary="No data could be found for this language..."
      />
    )

  const { title, customInfo, youTubePlaylist } = data || {}
  const { project, external, background, affiliation, endangerment } =
    customInfo || {}
  const { langStructure, prevResearch, addlInfo } = customInfo || {}
  const { elaWork, inNewYork } = customInfo || {}
  const { glottologId, gDriveDocId } = external || {}

  return (
    <Layout title={title} subtitle={customInfo?.endonym} summary={background}>
      <article>
        {youTubePlaylist?.id && (
          <YouTubePlaylist playlistId={youTubePlaylist.id} />
        )}
        <LangInstanceLinksList external={external} project={project} />
        <Tabs className={langStyles.tabs}>
          <TabList>
            {(affiliation || endangerment) && <Tab>Background</Tab>}
            {langStructure && <Tab>Language Structure</Tab>}
            {(glottologId || prevResearch) && <Tab>Previous Research</Tab>}
            {elaWork && <Tab>ELA's Work</Tab>}
            {inNewYork && <Tab>In New York</Tab>}
            {addlInfo && <Tab>More Info</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
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
                {project && (
                  <div
                    className={sharedStyles.flexCenter}
                    style={{ marginTop: 'var(--padding2)' }} // dammit
                  >
                    <Link href={project.uri || ''}>
                      <a className={`${btnStyles.button} ${btnStyles.primary}`}>
                        View project
                      </a>
                    </Link>
                  </div>
                )}
              </TabPanel>
            )}
            {inNewYork && (
              <TabPanel>
                <div dangerouslySetInnerHTML={{ __html: inNewYork }} />
                {external?.nycLangMap && (
                  <div className={sharedStyles.flexCenter}>
                    <a
                      href={external?.nycLangMap}
                      target="_blank"
                      rel="noreferrer"
                      className={`${btnStyles.button} ${btnStyles.primary}`}
                    >
                      View NYC map
                    </a>
                  </div>
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
