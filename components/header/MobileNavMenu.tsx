import Link from 'next/link'
import '@reach/menu-button/styles.css'

import { MenuItem } from 'gql-ts/wp-graphql'

import btnStyles from 'components/buttons/Button.module.css'
import styles from './MobileNav.module.css'

export type MobileNavMenuProps = {
  id: string
  data: MenuItem[]
  setIsOpen: React.Dispatch<boolean>
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = (props) => {
  const { id, data, setIsOpen } = props

  return (
    <nav aria-labelledby={id} className={styles.nav}>
      <ul>
        {data.map((node, i) => {
          const { label, path, childItems, parentId } = node || {}

          // Sloppy way to get Languages and Latest links on mobile menu
          if (!parentId && !childItems?.nodes?.length) {
            return (
              <li key={path} className={styles.childless}>
                <Link href={path || ''}>
                  <a
                    role="link"
                    tabIndex={i}
                    onKeyPress={() => setIsOpen(false)}
                    onClick={() => setIsOpen(false)}
                    className={`${btnStyles.button} ${btnStyles.secondary}`}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            )
          }

          return (
            <li key={path}>
              <h2 className={styles.heading}>{label}</h2>
              <ul className={styles.nestedList}>
                {childItems?.nodes?.map((item) => {
                  return (
                    <li key={item?.path}>
                      <Link href={item?.path || '/'}>
                        <a
                          role="link"
                          tabIndex={i}
                          onKeyPress={() => setIsOpen(false)}
                          onClick={() => setIsOpen(false)}
                          className={styles.link}
                        >
                          {item?.label}
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
