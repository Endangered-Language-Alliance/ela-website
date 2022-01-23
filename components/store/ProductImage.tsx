import Image from 'next/image'
import { MediaItem } from 'gql-ts/wp-graphql'

import styles from './Store.module.css'

type Props = {
  image?: MediaItem | null
  name?: string | null
}

export const ProductImage: React.FC<Props> = ({ image, name }) => {
  if (!image) return null

  return (
    <div className={styles.imgWrap}>
      <Image
        src={image.srcSet?.split(', ')[0].split(' ')[0] || ''}
        alt={name || image?.altText || ''}
        layout="fixed"
        objectFit="cover"
        priority
        width={200}
        height={200}
        placeholder="blur"
      />
    </div>
  )
}
