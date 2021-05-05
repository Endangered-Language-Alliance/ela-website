import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Layout } from '../../components/Layout'
import { RootQueryToLanguageConnection } from '../../wp-graphql'
import { getAllLanguages } from '../../lib/api'

type LanguagesProps = RootQueryToLanguageConnection

const Languages: FC<LanguagesProps> = (props) => {
  console.log(props)
  const { edges } = props

  return (
    <div>
      <Head>
        <title>Languages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1>Languages</h1>
        <hr />
        <section>
          {edges?.map((ugh) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { node } = ugh
            const { slug, title, excerpt } = node

            return (
              <article key={slug}>
                <h2>
                  <Link href={`/languages/${slug}`}>
                    <a>{title}</a>
                  </Link>
                </h2>
                <p dangerouslySetInnerHTML={{ __html: excerpt }} />
              </article>
            )
          })}
        </section>
      </Layout>
    </div>
  )
}

export default Languages

export async function getStaticProps() {
  const allLanguages = await getAllLanguages()

  return {
    props: {
      allLanguages,
    },
  }
}
