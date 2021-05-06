import Link from 'next/link'
import {
  Menu,
  MenuList,
  MenuButton,
  // MenuItems, // TODO: understand, restore
  MenuLink,
} from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import { useHeaderQuery } from './hooks'

const Header: React.FC = () => {
  const { data, error, isLoading } = useHeaderQuery()

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  const { menuItems } = data || {}

  return (
    <nav>
      <ul>
        {menuItems.nodes.map((node) => {
          const { label, path, childItems, parentId } = node || {}

          if (!parentId && !childItems.nodes.length) {
            return (
              <li key={path}>
                <Link href={path}>
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
                  {childItems.nodes.map((item) => {
                    return (
                      <MenuLink
                        key={item.path}
                        as={Link}
                        to={item.path}
                        href={item.path}
                      >
                        <a>{item.label}</a>
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

export default Header
