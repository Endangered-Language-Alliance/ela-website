import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Layout } from 'components/Layout'
import { Hero } from 'components/Hero'
import { getHomePageContent } from 'lib/api/api.home'
import { createMarkup } from 'lib/utils'
import { CONTENT_URL, PROD_URL } from 'lib/config'
import {
  GeneralSettings,
  Page,
  RootQueryToPostConnection,
} from 'gql-ts/wp-graphql'

export type HomeProps = {
  data: {
    generalSettings: GeneralSettings
    homePageContent: Page
    posts: RootQueryToPostConnection
  }
}

const Home: React.FC<HomeProps> = (props) => {
  const { data } = props || {}
  const { homePageContent, posts, generalSettings } = data
  const { content, homePageSettings = {}, title } = homePageContent
  const { fbFeedIframeHtml = '', featured1, numRecentPosts, youTubeUrl } =
    homePageSettings || {}
  const { description, heading, img, link } = featured1 || {}

  return (
    <>
      <Head>
        <title>Home - {generalSettings?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero title={title || ''}>
          <div dangerouslySetInnerHTML={createMarkup(content || '')} />
        </Hero>
        <iframe
          src={youTubeUrl || ''}
          title="TODO: add title"
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
        />
        <h2>Featured</h2>
        <section>
          <h3>{heading}</h3>
          {img?.sourceUrl && (
            <div
              style={{
                position: 'relative',
                width: 500,
                height: 300,
                borderRadius: 'var(--borderRad2)',
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
            href={
              link?.url?.replace(CONTENT_URL, '').replace(PROD_URL, '') || ''
            }
          >
            <a>Read More</a>
          </Link>
        </section>
        <h2>Recent, Updates, Latest, Posts, etc.</h2>
        <div dangerouslySetInnerHTML={createMarkup(fbFeedIframeHtml || '')} />
        <nav>
          <ul>
            {posts?.nodes?.slice(0, numRecentPosts || 5).map((node) => {
              return <li key={node?.title}>{node?.title}</li>
            })}
          </ul>
        </nav>
      </Layout>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const data = await getHomePageContent()

  return {
    props: { data },
  }
}
