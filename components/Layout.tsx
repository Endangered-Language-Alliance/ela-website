import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Hero } from 'components/Hero'
import { PostsItem } from 'components/latest/PostsItem'
import styles from './Layout.module.css'
import { Footer } from './footer'
import { LayoutProps } from './types'
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

export const Layout: React.FC<LayoutProps> = (props) => {
  const { title, children, summary, subtitle, chipsItems } = props
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
          <Hero
            title={title}
            summary={summary}
            subtitle={subtitle}
            chipsItems={chipsItems}
          />
          {youTubePlaylistId && (
            <YouTubePlaylist playlistId={youTubePlaylistId} />
          )}
          {tweenerContent}
          <div className={styles.content}>
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
