import Link from 'next/link'

import styles from './Card.module.css'
import { CardProps } from './types'

export const Card: React.FC<CardProps> = (props) => {
  const { children, title, uri, summary, subtitle } = props

  return (
    <article>
      <Link href={uri || ''}>
        <a className={styles.card}>
          <header className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && (
              <div role="doc-subtitle" className={styles.subtitle}>
                {subtitle}
              </div>
            )}
          </header>
          {summary && (
            <div
              dangerouslySetInnerHTML={{ __html: summary.trim() || '' }}
              className={styles.summary}
            />
          )}
          {children}
        </a>
      </Link>
    </article>
  )
}

export const CardList: React.FC = (props) => {
  const { children } = props

  return <div className={styles.list}>{children}</div>
}
