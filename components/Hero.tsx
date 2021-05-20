import { Breadcrumbs } from 'components/breadcrumbs/Breadcrumbs'
import { ChipsList } from './buttons/Chips'
import styles from './Hero.module.css'
import { HeroProps } from './types'

export const Hero: React.FC<HeroProps> = (props) => {
  const { title, subtitle, children, summary, chipsItems } = props

  return (
    <div className={styles.root}>
      <Breadcrumbs />
      {subtitle ? (
        <>
          <h1
            className={styles.title}
            style={{ marginBottom: 'var(--padding4)' }}
          >
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </>
      ) : (
        <h1 className={styles.title}>{title}</h1>
      )}
      {chipsItems && <ChipsList items={chipsItems} />}
      {summary && (
        <div
          dangerouslySetInnerHTML={{ __html: summary || '' }}
          className={styles.summary}
        />
      )}
      {children}
      <hr className={styles.divider} />
    </div>
  )
}
