import Link from 'next/link'
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import { MenuItem as WpMenuItem } from 'gql-ts/wp-graphql'

import styles from './Header.module.css'

export type NavMenuProps = {
  data: WpMenuItem[]
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
                      <MenuItem key={item?.path} onSelect={() => {}}>
                        <Link href={item?.path || '/'}>
                          <a>{item?.label}</a>
                        </Link>
                      </MenuItem>
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
