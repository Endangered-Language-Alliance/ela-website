import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'

import youTubeModalStyles from 'components/video/YouTube.module.css'
import styles from './Header.module.css'

export type NavMenuModalProps = {
  isOpen: boolean
  close: () => void
}

export const NavMenuModal: React.FC<NavMenuModalProps> = (props) => {
  const { close, isOpen, children } = props

  return (
    <Dialog isOpen={isOpen} onDismiss={close} className={styles.mobileNavModal}>
      <button
        className={youTubeModalStyles.dialogCloseBtn}
        onClick={close}
        type="button"
      >
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      {children}
    </Dialog>
  )
}
