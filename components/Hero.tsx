import styles from './Hero.module.css'

type HeroProps = {
  title: string
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { title, children } = props

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  )
}
