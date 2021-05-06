import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from '../../components/Layout'
import { Language } from '../../wp-graphql'
import { getAllLanguages } from './api'

type LanguagesProps = {
  data: { node: Language }[]
}

const Languages: FC<LanguagesProps> = (props) => {
  const { data = [] } = props

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
          {data?.map((ugh) => {
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllLanguages()

  return { props: { data } }
}
