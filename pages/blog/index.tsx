import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { createMarkup } from '../../lib/utils'
import { getAllPosts } from '../../lib/api'
import styles from '../../styles/Home.module.css'
import blogStyles from '../../styles/Blog.module.css'

import { Post } from '../../wp-graphql'

type BlogProps = { posts: Post[] }

const Blog: React.FC<BlogProps> = (props) => {
  const { posts = [] } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Latest blog articles</h1>
        <hr />
        <section>
          {posts.map(({ id, title, slug, date, excerpt }) => {
            return (
              <div className={blogStyles.listitem} key={id}>
                <div className={blogStyles.listitem__content}>
                  <h2>
                    <Link href={`/blog/${slug}`}>
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
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts()

  return {
    props: {
      posts: allPosts.nodes,
    },
  }
}

export default Blog
