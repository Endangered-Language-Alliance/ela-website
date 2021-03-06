import { useRef } from 'react'

import { Hero } from 'components/Hero'
import { BackToTopBtn } from 'components/buttons/BackToTopBtn'
import { PostsItem } from 'components/latest/PostsItem'
import { FeaturedCardList, FeaturedCard } from 'components/cards/FeaturedCard'
import { useHideOnScroll } from 'lib/hooks'

import { Footer } from './footer'
import { LayoutProps } from './types'
import { YouTubePlaylist } from './video/YouTubePlaylist'

import styles from './Layout.module.css'
import { CustomHead } from './CustomHead'

export const Layout: React.FC<LayoutProps> = (props) => {
  const { title, children, summary } = props
  const { subtitle, chipsItems, noContentWrap } = props
  const { tweenerContent, youTubePlaylistId, childPages } = props

  const targetElemID = 'back-to-top-anchor'
  const refElem = useRef<HTMLDivElement | null>(null)

  // High threshold since content elem might already be in view
  const hide = useHideOnScroll(refElem, 450)

  return (
    <>
      <CustomHead {...props} />
      <div className={styles.page}>
        <div className={styles.scrollWrap} ref={refElem} id="scroll-wrap">
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
              {childPages?.length ? (
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
              ) : null}
            </div>
          </main>
          <Footer />
        </div>
        <BackToTopBtn hide={!hide} targetElemID={targetElemID} />
      </div>
    </>
  )
}
