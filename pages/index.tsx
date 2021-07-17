import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import layoutStyles from 'components/Layout.module.css'
import { getHomePageContent } from 'lib/api/api.home'
import {
  GeneralSettings,
  Page,
  RootQueryToLanguageConnection,
  RootQueryToPostConnection,
  RootQueryToProjectConnection,
  ContentType,
} from 'gql-ts/wp-graphql'
import { FeaturedCardList, FeaturedCard } from 'components/cards/FeaturedCard'
import featCardStyles from 'components/cards/FeaturedCard.module.css'
import { PostsItem } from 'components/latest/PostsItem'
import { Showcase } from 'components/Showcase'

export type HomeProps = {
  data: {
    // TODO: get tagline for <meta>, otherwise remove this from HomeProps
    generalSettings: GeneralSettings
    homePageContent: Page
    posts: RootQueryToPostConnection
    projects: RootQueryToProjectConnection
    languages: RootQueryToLanguageConnection
    projectContentType: ContentType
    langContentType: ContentType
  }
}

const Home: React.FC<HomeProps> = (props) => {
  const { data } = props || {}
  const { homePageContent, posts } = data
  const { projects, languages, projectContentType, langContentType } = data
  const { title, homePageSettings = {}, customExcerpt } = homePageContent

  // TODO: rm from here and gql if def not using
  // const { fbFeedIframeHtml } = homePageSettings
  const { featured1, featured2, numRecentPosts, youTubeUrl } =
    homePageSettings || {}

  const Video = youTubeUrl !== undefined && (
    <div
      className={layoutStyles.flexCenter}
      style={{ marginBottom: 'var(--p4)' }}
    >
      <iframe
        style={{ margin: '0 auto 1rem' }}
        width="840"
        height="473"
        src={youTubeUrl || 'https://www.youtube.com/embed/eiW59UUivc0'}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )

  const RecentPosts = (
    // TODO: standardize
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 1 }} className={featCardStyles.list}>
        {posts?.nodes?.slice(0, numRecentPosts || 5).map((post) => {
          const {
            date,
            title: postTitle,
            uri,
            excerpt,
            customExcerpt: customPostExcerpt,
          } = post || {}

          return (
            <PostsItem
              key={postTitle}
              date={date || ''}
              title={postTitle || ''}
              uri={uri || ''}
              summary={customPostExcerpt?.excerpt || excerpt || ''}
            />
          )
        })}
      </div>
    </div>
  )

  return (
    <Layout
      noContentWrap
      titleTitle="Home"
      title={title}
      summary={customExcerpt?.excerpt || ''}
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
      <h2 style={{ color: 'var(--white)' }}>ELA at a Glance</h2>
      <Showcase
        projectsCount={projects.nodes?.length || 0}
        langsCount={languages.nodes?.length || 0}
        projectsBody={projectContentType?.description || ''}
        langsBody={langContentType?.description || ''}
      />
      <h2 style={{ color: 'var(--white)' }}>Introducing ELA</h2>
      {Video}
      <h2 style={{ color: 'var(--white)' }}>Recent Updates</h2>
      {RecentPosts}
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
