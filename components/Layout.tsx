import Head from 'next/head'
import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Hero } from 'components/Hero'
import { BackToTopBtn } from 'components/buttons/BackToTopBtn'
import { PostsItem } from 'components/latest/PostsItem'
import { FeaturedCardList, FeaturedCard } from 'components/cards/FeaturedCard'
import { useHideOnScroll } from 'lib/hooks'

import Header from './header'
import { Footer } from './footer'
import { LayoutProps } from './types'
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
  const targetElemID = 'back-to-top-anchor'
  const refElem = useRef<HTMLDivElement | null>(null)
  // High threshold since content elem might already be in view
  const hide = useHideOnScroll(refElem, 450)

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{titlePrefix}Endangered Language Alliance</title>
        {/* TODO: meta, app-icons, social media, etc. */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Header />
        <div className={styles.scrollWrap} ref={refElem}>
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
              <div className={styles.scrollTarget} id={targetElemID} />
              {children}
              <FeaturedCardList>
                {childPages?.map((childPage, i) => {
                  if (i === 0 && childPage.featuredImage?.node?.sourceUrl) {
                    return (
                      <FeaturedCard
                        key={childPage.uri}
                        altText={childPage.featuredImage.node?.altText || ''}
                        imgSrc={childPage.featuredImage.node?.sourceUrl || ''}
                        summary={childPage.customExcerpt?.excerpt || ''}
                        title={childPage.title || ''}
                        uri={childPage.uri || ''}
                      />
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
              </FeaturedCardList>
            </div>
          </main>
          <Footer />
        </div>
        <BackToTopBtn hide={!hide} targetElemID={targetElemID} />
      </div>
    </QueryClientProvider>
  )
}
