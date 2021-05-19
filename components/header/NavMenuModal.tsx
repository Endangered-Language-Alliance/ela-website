import { DialogOverlay, DialogContent } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'

import youTubeModalStyles from 'components/video/YouTube.module.css'
import mobileNavStyles from './MobileNav.module.css'

export type NavMenuModalProps = {
  isOpen: boolean
  close: () => void
}

export const NavMenuModal: React.FC<NavMenuModalProps> = (props) => {
  const { close, isOpen, children } = props

  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={close}
      className={mobileNavStyles.mobileNavModal}
    >
      <DialogContent>
        <button
          className={youTubeModalStyles.dialogCloseBtn}
          onClick={close}
          type="button"
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        {children}
      </DialogContent>
    </DialogOverlay>
  )
}
