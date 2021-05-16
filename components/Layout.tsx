import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Hero, HeroProps } from 'components/Hero'
import styles from './Layout.module.css'
import { Footer } from './footer'
import Header from './header'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})

type LayoutProps = HeroProps & {
  tweenerContent?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { title, children, summary, subtitle, tweenerContent } = props
  const titlePrefix = title ? `${title} - ` : ''

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{titlePrefix}Endangered Language Alliance</title>
        {/* TODO: meta, app-icons, social media, etc. */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        {/* TODO: reusable Head that accepts title prefix text */}
        <Header />
        <main className={`${styles.container} ${styles.main}`}>
          <Hero title={title} summary={summary} subtitle={subtitle} />
          {tweenerContent}
          <div className={styles.content}>{children}</div>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
