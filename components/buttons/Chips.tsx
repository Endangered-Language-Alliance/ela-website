import Link from 'next/link'
import chipStyles from 'components/buttons/Chip.module.css'
import styles from './Button.module.css'
import { ChipProps, ChipsListProps } from './types'

export const Chip: React.FC<ChipProps> = (props) => {
  const { text, uri, external, color = 'primary' } = props
  const classes = `${styles.button} ${chipStyles.chip} ${styles[color]}`

  if (external) {
    return (
      <a className={classes} target="_blank">
        {text}
      </a>
    )
  }

  return (
    <Link href={uri}>
      <a className={classes}>{text}</a>
    </Link>
  )
}

export const ChipsList: React.FC<ChipsListProps> = (props) => {
  const { color, items } = props

  return (
    <ul className={chipStyles.list}>
      {items.map((item) => (
        <li key={item.text}>
          <Chip color={color} {...item} />
        </li>
      ))}
    </ul>
  )
}
