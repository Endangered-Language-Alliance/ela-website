import Image from 'next/image'
import Link from 'next/link'

import styles from './ImageCard.module.css'

type ImageCardProps = {
  title?: string | null
  sourceUrl?: string | null
  altText?: string | null
  uri?: string | null
  excerpt?: string | null
}

export const ImageCard: React.FC<ImageCardProps> = (props) => {
  const { title, sourceUrl, altText, uri, children, excerpt } = props

  return (
    <div className={styles.root}>
      {sourceUrl && (
        <div className={styles.image}>
          <Image
            src={sourceUrl}
            alt={altText || title || ''}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.inner}>
        <h2 className={styles.title}>
          <Link href={uri || ''}>
            <a>{title}</a>
          </Link>
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: excerpt || '' }}
          className={styles.summary}
        />
        {children}
      </div>
    </div>
  )
}
