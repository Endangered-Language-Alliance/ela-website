import { DialogOverlay, DialogContent } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'
import { AiOutlineClose } from 'react-icons/ai'

import btnStyles from 'components/buttons/Button.module.css'
import mobileNavStyles from './MobileNav.module.css'

export type NavMenuModalProps = {
  isOpen: boolean
  close: () => void
}

export const NavMenuModal: React.FC<NavMenuModalProps> = (props) => {
  const { close, isOpen, children } = props
  const { button: btn, primary, contentOnly, dialogCloseBtn } = btnStyles

  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={close}
      className={mobileNavStyles.mobileNavModal}
    >
      <DialogContent>
        <button
          className={`${btn} ${primary} ${contentOnly} ${dialogCloseBtn}`}
          onClick={close}
          type="button"
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>
            <AiOutlineClose />
          </span>
        </button>
        {children}
      </DialogContent>
    </DialogOverlay>
  )
}
