import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getAllPostsWithSlug, getPost } from '../../lib/api/api.latest'
import { Layout } from '../../components/Layout'
import { Post } from '../../wp-graphql'

import styles from '../../styles/Home.module.css'
import blogStyles from '../../styles/Blog.module.css'

const formatDate = (date: string): string => {
  const newDate = new Date(date)

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`
}

const BlogPost: React.FC<{ postData?: Post }> = (props) => {
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

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths:
      allPosts?.edges?.map((edge) => {
        const { node } = edge || {}

        return `/latest/${node?.slug}`
      }) || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPost(params?.slug || '')

  return {
    props: {
      postData: data,
    },
  }
}

export default BlogPost
