import btnStyles from 'components/buttons/Button.module.css'
import sharedStyles from 'components/Layout.module.css'
import { SearchInput } from 'components/search/SearchInput'
import { CONTENT_URL, PROD_URL } from 'lib/config'
import Link from 'next/link'
import { useState } from 'react'
import { Burger } from './Burger'
import styles from './Header.module.css'
import { useHeaderQuery } from './hooks'
import { Logo } from './Logo'
import { MobileNavMenu } from './MobileNavMenu'
import { NavMenu } from './NavMenu'
import { CtaButtonProps } from './types'

const CtaButton: React.FC<CtaButtonProps> = (props) => {
  const { url, text } = props

  return (
    <Link href={url?.replace(CONTENT_URL, '').replace(PROD_URL, '') || ''}>
      <a className={`${btnStyles.button} ${btnStyles.secondary}`}>{text}</a>
    </Link>
  )
}

const Header: React.FC = () => {
  const { data, error, isLoading } = useHeaderQuery()
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false)

  if (isLoading || error) {
    return (
      <header className={styles.root}>
        <div className={`${sharedStyles.container} ${styles.inner}`}>
          <div className={styles.logo} />
          {error ? <div>Problems loading nav</div> : <div />}
        </div>
      </header>
    )
  }

  const { menuItems, siteWideStuff } = data || {}
  const { siteWideSettings } = siteWideStuff || {}

  return (
    <header className={styles.root}>
      <div className={`${sharedStyles.container} ${styles.inner}`}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        {menuItems?.nodes && (
          <>
            <NavMenu data={menuItems.nodes} />
            <Burger
              id="menu-label"
              isOpen={mobileNavIsOpen}
              setIsOpen={setMobileNavIsOpen}
            >
              <div
                style={{
                  width: 300,
                  margin: '0 auto var(--p2)',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <SearchInput />
              </div>
              <MobileNavMenu
                setIsOpen={setMobileNavIsOpen}
                data={menuItems.nodes}
                id="menu-label"
              />
            </Burger>
          </>
        )}
        <SearchInput desktopOnly />
        <CtaButton
          url={siteWideSettings?.ctaButton?.url}
          text={siteWideSettings?.ctaButton?.title}
        />
      </div>
    </header>
  )
}

export default Header
