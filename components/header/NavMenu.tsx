import Link from 'next/link'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import { MenuItem } from 'gql-ts/wp-graphql'

import styles from './Header.module.css'

export type NavMenuProps = {
  data: MenuItem[]
}

export const NavMenu: React.FC<NavMenuProps> = (props) => {
  const { data } = props

  return (
    <nav>
      <ul>
        {data.map((node) => {
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
                <MenuButton>
                  {label} <span aria-hidden>▾</span>
                </MenuButton>
                <MenuList className={styles.menuList}>
                  {childItems?.nodes?.map((item) => {
                    return (
                      <MenuLink
                        key={item?.path}
                        as={Link}
                        href={item?.path || '/'}
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
    </nav>
  )
}
