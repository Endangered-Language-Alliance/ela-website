import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

export default function Home() {
  return (
    <div className={styles.container}>
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
    </div>
  )
}
