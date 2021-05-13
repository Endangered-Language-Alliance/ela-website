import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { createMarkup } from 'lib/utils'
import { getAllPosts } from 'lib/api/api.latest'
import { Layout } from 'components/Layout'
import { Hero } from 'components/Hero'
import { Post } from 'gql-ts/wp-graphql'

import styles from 'styles/Home.module.css'
import blogStyles from 'styles/Blog.module.css'

type BlogProps = { posts: Post[] }

const Latest: React.FC<BlogProps> = (props) => {
  const { posts = [] } = props
  const currentYear = new Date().getFullYear()
  const spanOfYears = currentYear - 2009 // 2009 = oldest post year

  // TODO: into lib/utils
  // CRED: https://stackoverflow.com/a/55776744/1048518
  const range = (start: number, stop: number, step: number): number[] =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    )

  return (
    <div className={styles.container}>
      <Head>
        <title>Latest articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero title="Latest updates" />
        <nav>
          <ul>
            {range(currentYear, currentYear - spanOfYears, -1).map(
              (postYear) => (
                <li key={postYear}>
                  <Link href={`/latest/${postYear}`}>
                    <a>{postYear}</a>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
        <section>
          {posts.map(({ title, date, excerpt, uri }) => {
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
                  <div dangerouslySetInnerHTML={createMarkup(excerpt || '')} />
                </div>
              </div>
            )
          })}
        </section>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts()

  return {
    props: {
      posts: allPosts.nodes,
    },
    revalidate: 30,
  }
}

export default Latest
