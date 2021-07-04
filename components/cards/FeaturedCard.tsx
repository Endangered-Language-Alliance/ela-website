import Link from 'next/link'
import Image from 'next/image'

import btnSyles from 'components/buttons/Button.module.css'

import { FeaturedCardProps } from './types'
import styles from './FeaturedCard.module.css'

export const FeaturedCard: React.FC<FeaturedCardProps> = (props) => {
  const { title, summary, uri, subtitle } = props
  const { btnText = 'Read More', altText, imgSrc } = props

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.img}>
          <Image
            src={imgSrc}
            alt={altText || title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </header>
      <div className={styles.inner}>
        <div role="doc-subtitle" className={styles.subtitle}>
          {subtitle}
        </div>
        <p>{summary}</p>
        <div className={styles.link}>
          <Link href={uri}>
            <a className={`${btnSyles.button} ${btnSyles.secondary}`}>
              {btnText}
            </a>
          </Link>
        </div>
      </div>
    </article>
  )
}

export const FeaturedCardList: React.FC = (props) => {
  const { children } = props

  return <div className={styles.list}>{children}</div>
}
