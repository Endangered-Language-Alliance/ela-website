import Link from 'next/link'

import chipStyles from 'components/buttons/Chip.module.css'

import { ChipProps, ChipsListProps } from './types'
import styles from './Button.module.css'

export const Chip: React.FC<ChipProps> = (props) => {
  const { text, uri, external } = props
  const classes = `${styles.button} ${chipStyles.chip} ${styles.secondary}`

  if (external) {
    return (
      <a className={classes} target="_blank" href={uri} rel="noreferrer">
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
