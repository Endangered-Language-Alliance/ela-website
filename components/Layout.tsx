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
import { CustomHead } from './CustomHead'

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
  const { title, children, summary } = props
  const { subtitle, chipsItems, noContentWrap } = props
  const { tweenerContent, youTubePlaylistId, childPages } = props

  const targetElemID = 'back-to-top-anchor'
  const refElem = useRef<HTMLDivElement | null>(null)

  // High threshold since content elem might already be in view
  const hide = useHideOnScroll(refElem, 450)

  return (
    <QueryClientProvider client={queryClient}>
      <CustomHead {...props} />
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
            <div className={styles.afterTweener}>
              <div className={styles.scrollTarget} id={targetElemID} />
              <div
                className={
                  (!noContentWrap &&
                    typeof children !== 'undefined' &&
                    styles.content) ||
                  ''
                }
              >
                {children}
              </div>
              {childPages?.length && (
                <FeaturedCardList>
                  {childPages.map((childPage, i) => {
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
                        uri={childPage.uri || ''}
                        summary={childPage.customExcerpt?.excerpt || ''}
                      />
                    )
                  })}
                </FeaturedCardList>
              )}
            </div>
          </main>
          <Footer />
        </div>
        <BackToTopBtn hide={!hide} targetElemID={targetElemID} />
      </div>
    </QueryClientProvider>
  )
}
