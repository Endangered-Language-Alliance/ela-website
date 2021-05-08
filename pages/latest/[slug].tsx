import Head from 'next/head'
import { GetStaticProps } from 'next'

import { getAllPostsWithSlug, getPost } from './api'
import { Layout } from '../../components/Layout'

import styles from '../../styles/Home.module.css'
import blogStyles from '../../styles/Blog.module.css'

export default function Post({ postData }) {
  if (!postData) {
    return <p>No data could be found for the post...</p>
  }

  const formatDate = (date) => {
    const newDate = new Date(date)

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <article className={blogStyles.article}>
          <div className={blogStyles.postmeta}>
            <h1 className={styles.title}>{postData.title}</h1>
            <p>{formatDate(postData.date)}</p>
          </div>
          <div
            className="post-content content"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </article>
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts.edges.map(({ node }) => `/latest/${node.slug}`) || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const data = await getPost(slug)

  return {
    props: {
      postData: data.post,
    },
  }
}
