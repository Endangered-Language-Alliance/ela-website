import styles from './Hero.module.css'

type HeroProps = {
  title: string
  subtitle?: string // e.g. endonym
  summary?: string // e.g. excerpt
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { title, subtitle, children, summary } = props

  return (
    <div className={styles.root}>
      {subtitle ? (
        <>
          <h1 style={{ marginBottom: 0 }}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </>
      ) : (
        <h1>{title}</h1>
      )}
      {summary && (
        <div
          dangerouslySetInnerHTML={{ __html: summary || '' }}
          className={styles.summary}
        />
      )}
      {children}
    </div>
  )
}
