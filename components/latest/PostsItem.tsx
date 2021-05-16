import Link from 'next/link'

import { Post } from 'gql-ts/wp-graphql'
import { formatDate } from 'lib/utils'

import styles from './Blog.module.css'

export const PostsItem: React.FC<Post> = (props) => {
  const { title, date, excerpt, uri } = props

  return (
    <article className={styles.listitem}>
      <div className={styles.listitem__content}>
        <h2 className={styles.listItemTitle}>
          <Link href={uri || ''}>
            <a>{title}</a>
          </Link>
        </h2>
        <time className={styles.listItemDate} dateTime={date || ''}>
          {formatDate(date || '')}
        </time>
        <div
          className={styles.excerpt}
          dangerouslySetInnerHTML={{ __html: excerpt || '' }}
        />
      </div>
    </article>
  )
}
