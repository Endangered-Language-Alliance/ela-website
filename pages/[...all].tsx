import { GetStaticProps } from 'next'
import Head from 'next/head'

import { Layout } from 'components/Layout'
import { Hero } from 'components/Hero'
import { getPublishedPages, getPage } from 'lib/api/api.home'
import { createMarkup } from 'lib/utils'
import { Page } from 'gql-ts/wp-graphql'

type AllOtherPagesProps = {
  page: Page
}

const AllOtherPages: React.FC<AllOtherPagesProps> = (props) => {
  const { page } = props || {}
  const { title, content } = page || {}

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero title={title || ''} />
        <section dangerouslySetInnerHTML={createMarkup(content || '')} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { all } = params || { all: [] }

  const data = await getPage(`/${(all as string[]).join('/')}`)

  return {
    props: {
      page: data,
    },
  }
}

export async function getStaticPaths() {
  const allPublishedPages = await getPublishedPages()

  return {
    paths: allPublishedPages?.nodes?.map((node) => node?.uri) || [],
    fallback: true,
  }
}

export default AllOtherPages
