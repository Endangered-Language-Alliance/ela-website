import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { Layout } from 'components/Layout'
import { getHomePageContent } from 'lib/api/api.home'
import { CONTENT_URL, PROD_URL } from 'lib/config'
import {
  GeneralSettings,
  Page,
  RootQueryToPostConnection,
} from 'gql-ts/wp-graphql'
import btnStyles from 'components/buttons/Button.module.css'

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
  const { content, title, homePageSettings = {} } = homePageContent
  const { fbFeedIframeHtml = '', featured1, numRecentPosts, youTubeUrl } =
    homePageSettings || {}
  const { description, heading, img, link } = featured1 || {}

  return (
    <Layout titleTitle="Home" title={title} summary={content || ''}>
      <iframe
        src={youTubeUrl || ''}
        title="TODO: add title"
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
      />
      <h2>Featured</h2>
      <div>
        <h3>{heading}</h3>
        {img?.sourceUrl && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 300,
              borderRadius: 'var(--rad2)',
            }}
          >
            <Image
              src={img.sourceUrl || ''}
              alt={img?.altText || ''}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <p>{description}</p>
        <Link
          href={link?.url?.replace(CONTENT_URL, '').replace(PROD_URL, '') || ''}
        >
          <a className={`${btnStyles.button} ${btnStyles.primary}`}>
            Read More
          </a>
        </Link>
      </div>
      <h2>Recent Updates</h2>
      <div dangerouslySetInnerHTML={{ __html: fbFeedIframeHtml || '' }} />
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
