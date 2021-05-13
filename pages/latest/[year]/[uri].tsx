import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { getAllPostsWithSlug, getPost } from 'lib/api/api.latest'
import { Layout } from 'components/Layout'
import { Post } from 'gql-ts/wp-graphql'

import styles from 'styles/Home.module.css'
import blogStyles from 'styles/Blog.module.css'

const formatDate = (date: string): string => {
  const newDate = new Date(date)

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`
}

const PostByYear: React.FC<{ postData?: Post }> = (props) => {
  const { postData } = props

  if (!postData) <p>No data could be found for the post...</p>

  const { title, date, content } = postData || {}

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <article className={blogStyles.article}>
          <div className={blogStyles.postmeta}>
            <h1 className={styles.title}>{title}</h1>
            <p>{formatDate(date || '')}</p>
          </div>
          <div
            className="post-content content"
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        </article>
      </Layout>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths:
      allPosts?.edges?.map((edge) => {
        const { node } = edge || {}

        return node?.uri || ''
      }) || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPost(`/latest/${params?.year}/${params?.uri}` || '')
  const yearOfPost = parseInt(params?.year as string, 10)

  // Refetch current-year posts in background every 30 seconds.
  const currentYear = new Date().getFullYear()
  const revalidate = currentYear >= yearOfPost ? 30 : false

  return {
    props: {
      postData: data,
      params,
    },
    revalidate,
  }
}

export default PostByYear
