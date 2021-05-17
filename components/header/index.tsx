import Link from 'next/link'
import Image from 'next/image'

import sharedStyles from 'components/Layout.module.css'
import btnStyles from 'components/buttons/Button.module.css'
import styles from './Header.module.css'

import { Burger } from './Burger'
import { NavMenu } from './NavMenu'
import { useHeaderQuery } from './hooks'

const Header: React.FC = () => {
  const { data, error, isLoading } = useHeaderQuery()

  const GetInvolvedCta = (
    <Link href="/get-involved">
      <a
        className={`${btnStyles.button} ${btnStyles.primary} ${btnStyles.large}`}
      >
        Get involved
      </a>
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
              // TODO: stop using Image
              <Image
                src={src}
                alt="organization logo"
                layout="fill"
                objectFit="contain"
              />
            )}
          </a>
        </Link>
        {menuItems?.nodes && (
          <>
            <NavMenu data={menuItems.nodes} />
            <Burger
              id="menu-label"
              navMenu={<NavMenu id="menu-label" data={menuItems.nodes} />}
            />
          </>
        )}
        {GetInvolvedCta}
      </div>
    </header>
  )
}

export default Header
