import styles from './Hero.module.css'

export type HeroProps = {
  title?: string | null
  subtitle?: string | null // e.g. endonym
  summary?: string | null // e.g. excerpt
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { title, subtitle, children, summary } = props

  return (
    <div className={styles.root}>
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
