import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { getAllLangsWithSlug, getLanguage } from 'lib/api/api.languages'
import { Layout } from 'components/Layout'
import { Language as LanguageType } from 'gql-ts/wp-graphql'

import styles from 'styles/Home.module.css'

const Language: React.FC<{ data?: LanguageType }> = (props) => {
  const { data } = props

  if (!data) return <p>No data could be found for this language...</p>

  const { title, excerpt, featuredImage } = data || {}

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <article style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>{title}</h1>
          {featuredImage?.node?.sourceUrl && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 300,
                borderRadius: 'var(--borderRad-1)',
              }}
            >
              <Image
                src={featuredImage?.node.sourceUrl || ''}
                alt={featuredImage?.node?.altText || ''}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: excerpt || '' }} />
        </article>
      </Layout>
    </div>
  )
}

export async function getStaticPaths() {
  const allLangs = await getAllLangsWithSlug()

  return {
    paths:
      allLangs?.edges?.map((edge) => {
        const { node } = edge || {}

        return `/languages/${node?.slug}`
      }) || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getLanguage(params?.slug || '')

  return {
    props: {
      data,
    },
  }
}

export default Language
