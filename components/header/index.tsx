import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import {
  Menu,
  MenuList,
  MenuButton,
  // MenuItems, // TODO: understand, restore
  MenuLink,
} from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import { Menu as WpMenu } from '../../wp-graphql'

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL as string

const Header: FC = () => {
  const { data, error, isLoading } = useQuery<WpMenu>(
    'main-menu',
    async () => {
      const mainMenuResp = await request(
        API_URL,
        gql`
          query MainMenuQuery {
            menuItems(where: { location: PRIMARY, parentId: "" }) {
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
            parentId
          }
        `
      )

      return mainMenuResp
    },
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  const { menuItems } = data

  return (
    <nav>
      <ul>
        {menuItems.nodes.map((node) => {
          const { label, path, childItems, parentId } = node

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
                  <Link href={path}>
                    <a>View all</a>
                  </Link>
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
