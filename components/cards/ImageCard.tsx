import Link from 'next/link'

import styles from './ImageCard.module.css'

type ImageCardProps = {
  title?: string | null
  uri?: string | null
  summary?: string | null
  subtitle?: string | null
}

export const ImageCard: React.FC<ImageCardProps> = (props) => {
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
