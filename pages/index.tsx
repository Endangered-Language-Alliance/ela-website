import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Layout } from '../components/Layout'
import { getHomePageContent } from '../lib/api'
import { createMarkup } from '../lib/utils'
import { Page, Post } from '../wp-graphql'
import { CONTENT_URL, PROD_URL } from '../shared/config'

export type HomeProps = {
  data: { meat: Page; posts: { edges: { node: Post }[] } }
}

const Home: React.FC<HomeProps> = (props) => {
  const { data } = props || {}
  const { meat, posts } = data
  const { content, homePageSettings = {} } = meat
  const { fbFeedIframeHtml = '', featured1, numRecentPosts, youTubeUrl } =
    homePageSettings || {}
  const { description, heading, img, link } = featured1 || {}

  return (
    <>
      <Head>
        <title>Use the title from the site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1>Should there be custom title?</h1>
        <div dangerouslySetInnerHTML={createMarkup(content || '')} />
        <iframe
          src={youTubeUrl || ''}
          title="TODO: add title"
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
        />
        <h2>Featuredness</h2>
        <section>
          <h3>{heading}</h3>
          {img?.sourceUrl && (
            <div
              style={{
                position: 'relative',
                width: 500,
                height: 300,
                borderRadius: 'var(--borderRad-1)',
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
            {posts?.edges?.slice(0, numRecentPosts || 5).map((post) => {
              return <li key={post.node.title}>{post.node.title}</li>
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
