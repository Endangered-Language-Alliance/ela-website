import Link from 'next/link'

import styles from './Card.module.css'
import { CardProps } from './types'

export const Card: React.FC<CardProps> = (props) => {
  const { title, uri, summary, subtitle } = props

  return (
    <Link href={uri || ''}>
      <a className={styles.root}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        <div
          dangerouslySetInnerHTML={{ __html: summary?.trim() || '' }}
          className={styles.summary}
        />
      </a>
    </Link>
  )
}
