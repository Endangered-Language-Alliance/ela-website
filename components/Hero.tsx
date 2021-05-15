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
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
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
