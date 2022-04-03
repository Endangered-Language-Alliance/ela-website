import { FC, MouseEvent } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'

import { Button } from 'components/buttons/Button'
import styles from './Button.module.css'

type BackToTopBtnProps = {
  hide: boolean
  targetElemID: string
}

export const BackToTopBtn: FC<BackToTopBtnProps> = (props) => {
  const { targetElemID, hide } = props

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(`#${targetElemID}`)

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const classes = hide ? styles.offScreenBottom : ''

  return (
    // TODO: support <T> or whatever in ButtonProps
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Button onClick={handleClick} classes={`${styles.backToTopBtn} ${classes}`}>
      <FaArrowCircleUp />
    </Button>
  )
}
