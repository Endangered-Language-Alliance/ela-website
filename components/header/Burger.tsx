import { useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'

import btnStyles from 'components/buttons/Button.module.css'
import mobileNavStyles from './MobileNav.module.css'
import { NavMenuModal } from './NavMenuModal'
import { BurgerProps } from './types'

// CRED: (partial):
// http://www.ashleysheridan.co.uk/blog/Making+an+Accessible+Hamburger+Menu
export const Burger: React.FC<BurgerProps> = (props) => {
  const { id, children } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={mobileNavStyles.burger}>
      <span hidden id={id}>
        Navigation menu
      </span>
      <button
        className={`${btnStyles.button} ${btnStyles.contentOnly}`}
        type="button"
        aria-labelledby={id}
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={() => setIsOpen(true)}
      >
        <HiOutlineMenu />
      </button>
      <NavMenuModal
        isOpen={isOpen}
        close={() => {
          setIsOpen(false)
        }}
      >
        {children}
      </NavMenuModal>
    </div>
  )
}
