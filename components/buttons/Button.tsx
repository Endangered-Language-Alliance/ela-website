import styles from './Button.module.css'

type ButtonProps = {
  onClick?: (stuff?: unknown) => void
  ariaLabel?: string
  classes?: string
  type?: 'submit' | 'button' | 'reset'
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, ariaLabel, classes, type = 'button' } = props

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type} // not worth the linter fight
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${styles.button} ${styles.secondary} ${classes}`}
    >
      {children}
    </button>
  )
}
