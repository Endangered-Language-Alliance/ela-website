import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Hero } from 'components/Hero'
import { PostsItem } from 'components/latest/PostsItem'
import { FeaturedCardList, FeaturedCard } from 'components/cards/FeaturedCard'

import { Footer } from './footer'
import { LayoutProps } from './types'
import Header from './header'
import { YouTubePlaylist } from './video/YouTubePlaylist'

import styles from './Layout.module.css'

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
  const { tweenerContent, youTubePlaylistId, childPages, titleTitle } = props
  const titlePrefix = titleTitle || title ? `${titleTitle || title} - ` : ''

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
            {children}
            {childPages?.map((childPage, i) => {
              if (i === 0 && childPage.featuredImage?.node?.sourceUrl) {
                return (
                  <FeaturedCardList key={childPage.uri}>
                    <FeaturedCard
                      altText={childPage.featuredImage.node?.altText || ''}
                      imgSrc={childPage.featuredImage.node?.sourceUrl || ''}
                      summary={childPage.customExcerpt?.excerpt || ''}
                      title={childPage.title || ''}
                      uri={childPage.uri || ''}
                    />
                  </FeaturedCardList>
                )
              }

              return (
                <PostsItem
                  key={childPage.uri}
                  title={childPage.title || ''}
                  uri={childPage.uri}
                  summary={childPage.customExcerpt?.excerpt || ''}
                />
              )
            })}
          </div>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
