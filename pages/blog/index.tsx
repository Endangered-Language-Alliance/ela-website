import Head from 'next/head'
import Link from 'next/link'

// data
import { getAllPosts } from '../../lib/api'

// styles
import styles from '../../styles/Home.module.css'
import blogStyles from '../../styles/Blog.module.css'

function createMarkup(text: string) {
  return { __html: text }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Blog = ({ allPosts: { edges } }) => {
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
          {edges.map(({ node }) => (
            <div className={blogStyles.listitem} key={node.id}>
              <div className={blogStyles.listitem__content}>
                <h2>
                  <Link href={`/blog/${node.slug}`}>
                    <a>{node.title}</a>
                  </Link>
                </h2>
                <time
                  className={blogStyles.listitem__date}
                  dateTime={node.date}
                >
                  {node.date}
                </time>
                <div dangerouslySetInnerHTML={createMarkup(node.excerpt)} />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default Blog

export async function getStaticProps() {
  const allPosts = await getAllPosts()

  return {
    props: {
      allPosts,
    },
  }
}
