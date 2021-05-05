import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  // MenuItems, // TODO: understand, restore
  MenuLink,
} from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import { Menu as WpMenu } from '../../wp-graphql'

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL as string

const Header: FC = () => {
  const { data, error, isLoading } = useQuery<WpMenu>('posts', async () => {
    const mainMenuResp = await request(
      API_URL,
      gql`
        query MainMenuQuery {
          menuItems(where: { location: PRIMARY }) {
            nodes {
              ...MenuBits
              childItems {
                nodes {
                  ...MenuBits
                }
              }
            }
          }
        }

        fragment MenuBits on MenuItem {
          label
          path
        }
      `
    )

    return mainMenuResp
  })

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  const { menuItems } = data

  return (
    <nav>
      <ul style={{ display: 'flex' }}>
        {menuItems.nodes.map((node) => {
          const { label, path, childItems } = node

          console.log(node)
          if (!childItems.nodes.length) {
            return (
              <li key={path}>
                <Link href={path}>
                  <a>{label}</a>
                </Link>
              </li>
            )
          }

          return (
            <Menu key={path}>
              <MenuButton>{label}</MenuButton>
              <MenuList>
                {childItems.nodes.length ? (
                  childItems.nodes.map((item) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return <MenuItem key={item.label}>{item.label}</MenuItem>
                  })
                ) : (
                  <MenuLink as={Link} to={item.path}>
                    Somewhere w/ Reach Router
                  </MenuLink>
                )}
              </MenuList>
            </Menu>
          )
        })}
      </ul>
    </nav>
  )
}

export default Header
