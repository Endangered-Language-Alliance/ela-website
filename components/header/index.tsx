import Link from 'next/link'
import {
  Menu,
  MenuList,
  MenuButton,
  // MenuItems, // TODO: understand, restore
  MenuLink,
} from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import sharedStyles from 'styles/Shared.module.css'
import { useHeaderQuery } from './hooks'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const { data, error, isLoading } = useHeaderQuery()

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  const { menuItems } = data || {}

  return (
    <nav className={styles.root}>
      <div className={`${sharedStyles.container} ${styles.inner}`}>
        <ul>
          {menuItems?.nodes?.map((node) => {
            const { label, path, childItems, parentId } = node || {}
            if (!parentId && !childItems?.nodes?.length) {
              return (
                <li key={path}>
                  <Link href={path || ''}>
                    <a>{label}</a>
                  </Link>
                </li>
              )
            }

            return (
              <li key={path}>
                <Menu>
                  <MenuButton>{label}</MenuButton>
                  <MenuList>
                    {childItems?.nodes?.map((item) => {
                      return (
                        <MenuLink
                          key={item?.path}
                          as={Link}
                          href={item?.path || ''}
                        >
                          {item?.label}
                        </MenuLink>
                      )
                    })}
                  </MenuList>
                </Menu>
              </li>
            )
          })}
        </ul>
        <Link href="/get-involved">
          <a className={styles.cta}>GET INVOLVED</a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
