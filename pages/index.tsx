import Head from 'next/head'

import { Layout } from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Use the title from the site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1>Eventually</h1>
        <ul>
          <li>youtube vid</li>
          <li>feat img 1</li>
          <li>feat img 2</li>
          <li>latest posts preview list</li>
        </ul>
      </Layout>
    </>
  )
}
