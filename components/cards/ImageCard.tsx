import Image from 'next/image'
import styles from './ImageCard.module.css'

// TODO: wowwww what a mess
type ImageCardProps = {
  title?: string | null
  sourceUrl?: string | null
  altText?: string | null
}

export const ImageCard: React.FC<ImageCardProps> = (props) => {
  const { title, sourceUrl, altText, children } = props

  return (
    <div className={styles.root}>
      {sourceUrl && (
        <Image
          src={sourceUrl}
          alt={altText || title || ''}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      )}
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
