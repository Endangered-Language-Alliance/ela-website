import styles from './Button.module.css'

type ButtonProps = {
  onClick: (stuff?: unknown) => void
  ariaLabel?: string
  classes?: string
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, ariaLabel, classes } = props

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${styles.button} ${styles.secondary} ${classes}`}
    >
      {children}
    </button>
  )
}
