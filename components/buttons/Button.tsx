import styles from './Button.module.css'

type ButtonProps = {
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick } = props

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${styles.primary}`}
    >
      {children}
    </button>
  )
}
