import { useState } from 'react'
import { RiMenu5Fill } from 'react-icons/ri'

import btnStyles from 'components/buttons/Button.module.css'
import styles from './Header.module.css'
import { NavMenuModal } from './NavMenuModal'

export type BurgerProps = {
  id: string
  navMenu: React.ReactNode
}

// CRED: (partial):
// http://www.ashleysheridan.co.uk/blog/Making+an+Accessible+Hamburger+Menu
export const Burger: React.FC<BurgerProps> = (props) => {
  const { navMenu, id } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={styles.burger}>
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
        <RiMenu5Fill />
      </button>
      <NavMenuModal
        isOpen={isOpen}
        close={() => {
          setIsOpen(false)
        }}
      >
        {navMenu}
      </NavMenuModal>
    </div>
  )
}
