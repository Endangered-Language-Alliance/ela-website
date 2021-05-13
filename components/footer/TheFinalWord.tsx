import sharedStyles from 'styles/Shared.module.css'
import styles from './Footer.module.css'

import { TheFinalWordProps } from './types'

export const TheFinalWord: React.FC<TheFinalWordProps> = (props) => {
  const { children, sourceUrl, title } = props

  return (
    <div className={styles.final}>
      <div className={sharedStyles.container}>
        <div>
          <img src={sourceUrl || ''} alt="ELA logo" className={styles.logo} />
        </div>
        <small>
          &copy; Copyright {new Date().getFullYear()}, {title}
        </small>
        {children}
      </div>
    </div>
  )
}
