import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { Language } from 'gql-ts/wp-graphql'

type LanguagesProps = {
  data: { node: Language }[]
}

const Languages: React.FC<LanguagesProps> = (props) => {
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
            const { slug, title, excerpt, langLocations } = node

            return (
              <article key={slug}>
                <h2>
                  <Link href={`/languages/${slug}`}>
                    <a>{title}</a>
                  </Link>
                </h2>
                <pre>{JSON.stringify(langLocations?.edges, null, 2)}</pre>
                <p dangerouslySetInnerHTML={{ __html: excerpt || '' }} />
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
