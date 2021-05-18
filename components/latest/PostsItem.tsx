import Link from 'next/link'

import { formatDate } from 'lib/utils'
import styles from './Blog.module.css'
import { PostsItemProps } from './types'

export const PostsItem: React.FC<PostsItemProps> = (props) => {
  const { title, date, summary, uri } = props

  return (
    <article className={styles.listitem}>
      <div className={styles.listitem__content}>
        <h2 className={styles.listItemTitle}>
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
    </article>
  )
}
