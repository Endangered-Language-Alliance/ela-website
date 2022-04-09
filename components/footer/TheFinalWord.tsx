import Image from 'next/image'
import styles from './Footer.module.css'

import { TheFinalWordProps } from './types'

export const TheFinalWord: React.FC<TheFinalWordProps> = (props) => {
  const { children, sourceUrl, title } = props

  return (
    <div className={styles.final}>
      <Image src={sourceUrl || ''} alt="ELA logo" className={styles.logo} />
      <small>
        &copy; Copyright {new Date().getFullYear()}, {title}
      </small>
      {children}
    </div>
  )
}
