import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getPublishedPages, getPage } from 'lib/api/api.home'
import { Page } from 'gql-ts/wp-graphql'

type AllOtherPagesProps = {
  page: Page
}

const AllOtherPages: React.FC<AllOtherPagesProps> = (props) => {
  const { page } = props || {}
  const { title, content } = page || {}

  return (
    <Layout title={title}>
      <div dangerouslySetInnerHTML={{ __html: content || '' }} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { all } = params || { all: [] }

  const data = await getPage(`/${(all as string[]).join('/')}`)

  return {
    props: {
      page: data,
    },
    revalidate: 15,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPublishedPages = await getPublishedPages()

  return {
    paths: allPublishedPages?.nodes?.map((node) => node?.uri || '') || [],
    fallback: true,
  }
}

export default AllOtherPages
