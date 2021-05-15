import Link from 'next/link'
import Image from 'next/image'
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button'
import '@reach/menu-button/styles.css'

import sharedStyles from 'styles/Shared.module.css'
import btnStyles from 'components/buttons/Button.module.css'
import styles from './Header.module.css'

import { useHeaderQuery } from './hooks'

const Header: React.FC = () => {
  const { data, error, isLoading } = useHeaderQuery()

  const GetInvolvedCta = (
    <Link href="/get-involved">
      <a className={`${btnStyles.button} ${btnStyles.primary}`}>Get involved</a>
    </Link>
  )

  if (isLoading || error) {
    return (
      <header className={styles.root}>
        <div className={`${sharedStyles.container} ${styles.inner}`}>
          <div className={styles.logo} />
          {error ? <div>Problems loading nav</div> : <div />}
          {GetInvolvedCta}
        </div>
      </header>
    )
  }

  const { menuItems, logo } = data || {}
  const src = logo?.siteWideSettings?.logo?.sourceUrl || ''

  return (
    <header className={styles.root}>
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
        <nav>
          <ul>
            {/* Manually link to Home so we can use different Home title */}
            <li>
              <Link href="/">
                <a className={styles.link}>Home</a>
              </Link>
            </li>
            {menuItems?.nodes?.map((node) => {
              const { label, path, childItems, parentId } = node || {}

              if (!parentId && !childItems?.nodes?.length) {
                return (
                  <li key={path}>
                    <Link href={path || ''}>
                      <a className={styles.link}>{label}</a>
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
        </nav>
        {GetInvolvedCta}
      </div>
    </header>
  )
}

export default Header
