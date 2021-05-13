import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { Hero } from 'components/Hero'
import { createMarkup } from 'lib/utils'
import { getAllPostsWithSlug, getPostsByYear } from 'lib/api/api.latest'
import { Post } from 'gql-ts/wp-graphql'

import styles from 'styles/Home.module.css'
import blogStyles from 'styles/Blog.module.css'

type BlogProps = { posts: Post[]; year: string }

const Latest: React.FC<BlogProps> = (props) => {
  const { posts = [], year } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Latest articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Hero title={year} />
        <section>
          {(posts.length &&
            posts.map(({ title, date, excerpt, uri }) => {
              return (
                <div className={blogStyles.listitem} key={uri}>
                  <div className={blogStyles.listitem__content}>
                    <h2>
                      <Link href={uri || ''}>
                        <a>{title}</a>
                      </Link>
                    </h2>
                    <time
                      className={blogStyles.listitem__date}
                      dateTime={date || ''}
                    >
                      {date}
                    </time>
                    <div
                      dangerouslySetInnerHTML={createMarkup(excerpt || '')}
                    />
                  </div>
                </div>
              )
            })) || <p>No posts found.</p>}
        </section>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { year } = params || { year: '2000' }
  const data = await getPostsByYear(parseInt(year as string, 10))

  return { props: { posts: data?.nodes, year } }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts?.nodes?.map((node) => node?.uri) || [],
    fallback: true,
  }
}

export default Latest
