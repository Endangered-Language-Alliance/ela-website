import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { Layout } from 'components/Layout'
import { Hero } from 'components/Hero'
import { createMarkup } from 'lib/utils'
import { getAllPostsWithSlug, getPostsByYear } from 'lib/api/api.latest'
import { Post } from 'gql-ts/wp-graphql'

import blogStyles from 'styles/Blog.module.css'

type BlogProps = { posts: Post[]; year: string }

const Latest: React.FC<BlogProps> = (props) => {
  const { posts = [], year } = props

  return (
    <>
      <Head>
        <title>Latest articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Hero title={year} />
        <div>
          {(posts.length &&
            posts.map(({ title, date, excerpt, uri }) => {
              return (
                <article className={blogStyles.listitem} key={uri}>
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
                </article>
              )
            })) || <p>No posts found.</p>}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { year } = params || { year: '2000' }
  const yearOfPost = parseInt(year as string, 10)
  const data = await getPostsByYear(yearOfPost)

  // Refetch current year's list of posts in background every 30 seconds.
  const currentYear = new Date().getFullYear()
  const revalidate = currentYear >= yearOfPost ? 30 : false

  return {
    props: {
      posts: data?.nodes,
      year,
    },
    revalidate,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts?.nodes?.map((node) => node?.uri || '') || [],
    fallback: true,
  }
}

export default Latest
