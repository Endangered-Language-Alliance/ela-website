import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Hero, HeroProps } from 'components/Hero'
import { PostsItem } from 'components/latest/PostsItem'
import { Page } from 'gql-ts/wp-graphql'
import { Breadcrumbs } from 'components/breadcrumbs/Breadcrumbs'
import styles from './Layout.module.css'
import { Footer } from './footer'
import Header from './header'
import { YouTubePlaylist } from './video/YouTubePlaylist'

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
  youTubePlaylistId?: string | null
  childPages?: Page[] | null
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { title, children, summary, subtitle } = props
  const { tweenerContent, youTubePlaylistId, childPages } = props
  const titlePrefix = title ? `${title} - ` : ''

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{titlePrefix}Endangered Language Alliance</title>
        {/* TODO: meta, app-icons, social media, etc. */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header />
        <main className={`${styles.container} ${styles.main}`}>
          <Hero title={title} summary={summary} subtitle={subtitle} />
          {tweenerContent}
          {youTubePlaylistId && (
            <YouTubePlaylist playlistId={youTubePlaylistId} />
          )}
          <div className={styles.content}>
            <Breadcrumbs />
            {childPages?.map((childPage) => (
              <PostsItem
                key={childPage.uri}
                title={childPage.title || ''}
                uri={childPage.uri}
                summary={childPage.customExcerpt?.excerpt || ''}
              />
            ))}
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
