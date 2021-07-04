import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import layoutStyles from 'components/Layout.module.css'
import { getHomePageContent } from 'lib/api/api.home'
import {
  GeneralSettings,
  Page,
  RootQueryToPostConnection,
} from 'gql-ts/wp-graphql'
import { FeaturedCardList, FeaturedCard } from 'components/cards/FeaturedCard'

export type HomeProps = {
  data: {
    // TODO: get tagline for <meta>, otherwise remove this from HomeProps
    generalSettings: GeneralSettings
    homePageContent: Page
    posts: RootQueryToPostConnection
  }
}

const Home: React.FC<HomeProps> = (props) => {
  const { data } = props || {}
  const { homePageContent, posts } = data
  const { title, homePageSettings = {}, customExcerpt } = homePageContent
  const { featured1, featured2, numRecentPosts, youTubeUrl } =
    homePageSettings || {}

  return (
    <Layout
      noContentWrap
      titleTitle="Home"
      title={title}
      summary={customExcerpt?.excerpt || ''}
      tweenerContent={
        youTubeUrl && (
          <div
            className={layoutStyles.flexCenter}
            style={{ marginBottom: 'var(--p4)' }}
          >
            <iframe
              style={{ margin: '0 auto 1rem' }}
              width="840"
              height="473"
              src="https://www.youtube.com/embed/eiW59UUivc0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      }
    >
      <FeaturedCardList>
        <FeaturedCard
          altText={featured1?.img?.altText || ''}
          imgSrc={featured1?.img?.sourceUrl || ''}
          subtitle={featured1?.link?.title || ''}
          summary={featured1?.description || ''}
          title={featured1?.heading || ''}
          uri={featured1?.link?.url || ''}
        />
        <FeaturedCard
          altText={featured2?.img?.altText || ''}
          imgSrc={featured2?.img?.sourceUrl || ''}
          subtitle={featured2?.link?.title || ''}
          summary={featured2?.description || ''}
          title={featured2?.heading || ''}
          uri={featured2?.link?.url || ''}
        />
      </FeaturedCardList>
      <h2>Recent Updates</h2>
      {/* TODO: rm from here and gql if def not using */}
      {/* {fbFeedIframeHtml && ( <div dangerouslySetInnerHTML={{ __html: fbFeedIframeHtml || '' }} /> )} */}
      <nav>
        <ul>
          {posts?.nodes?.slice(0, numRecentPosts || 5).map((node) => {
            return <li key={node?.title}>{node?.title}</li>
          })}
        </ul>
      </nav>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const data = await getHomePageContent()

  return {
    props: { data },
    revalidate: 15,
  }
}
