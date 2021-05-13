import Head from 'next/head'

import { Layout } from 'components/Layout'

export const LoadingLayout: React.FC = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    </>
  )
}
