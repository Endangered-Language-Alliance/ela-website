import Link from 'next/link'

import { formatDate } from 'lib/utils'
import featCardStyles from 'components/cards/FeaturedCard.module.css'
import btnSyles from 'components/buttons/Button.module.css'
import { PostsItemProps } from './types'

import styles from './Blog.module.css'

export const PostsItem: React.FC<PostsItemProps> = (props) => {
  const { title, date, summary, uri } = props

  return (
    <article className={styles.root}>
      <div>
        <h2 className={styles.title}>
          <Link href={uri || ''}>
            <a>{title}</a>
          </Link>
        </h2>
        {date && (
          <time className={styles.subtitle} dateTime={date || ''}>
            {formatDate(date || '')}
          </time>
        )}
        {summary && (
          <div
            className={styles.summary}
            // Remove WP's "Read More..." links
            // CRED: https://stackoverflow.com/a/960178/1048518
            dangerouslySetInnerHTML={{
              __html: summary.replace(/<a\b[^>]*>(.*?)<\/a>/i, '') || '',
            }}
          />
        )}
      </div>
      <div className={featCardStyles.link}>
        <Link href={uri}>
          <a className={`${btnSyles.button} ${btnSyles.secondary}`}>
            Read More
          </a>
        </Link>
      </div>
    </article>
  )
}
