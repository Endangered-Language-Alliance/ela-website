import Link from 'next/link'
import Image from 'next/image'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import sharedStyles from 'styles/Shared.module.css'
import styles from './Header.module.css'

import { useHeaderQuery } from './hooks'

const Header: React.FC = () => {
  const { data, error, isLoading } = useHeaderQuery()

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  const { menuItems, logo } = data || {}
  const src = logo?.siteWideSettings?.logo?.sourceUrl || ''

  return (
    <nav className={styles.root}>
      <div className={`${sharedStyles.container} ${styles.inner}`}>
        <Link href="/">
          <a className={styles.logo}>
            {src && (
              <Image
                src={src}
                alt="organization logo"
                layout="fill"
                objectFit="contain"
              />
            )}
          </a>
        </Link>
        <ul>
          {/* Manually link to Home so we can use different Home title */}
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
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
                  <MenuButton>
                    {label} <span aria-hidden>▾</span>
                  </MenuButton>
                  <MenuList className={styles.ahhhh}>
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
        <Link href="/get-involved">
          <a className={styles.cta}>GET INVOLVED</a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
