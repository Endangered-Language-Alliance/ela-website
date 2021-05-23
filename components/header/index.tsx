import Link from 'next/link'
import Image from 'next/image'

import { CONTENT_URL, PROD_URL } from 'lib/config'

import sharedStyles from 'components/Layout.module.css'
import btnStyles from 'components/buttons/Button.module.css'

import { CtaButtonProps } from './types'
import { Burger } from './Burger'
import { NavMenu } from './NavMenu'
import { MobileNavMenu } from './MobileNavMenu'
import { useHeaderQuery } from './hooks'

import styles from './Header.module.css'

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
  const src = siteWideSettings?.logo?.sourceUrl || ''

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
            <Burger id="menu-label">
              <MobileNavMenu data={menuItems.nodes} id="menu-label" />
            </Burger>
          </>
        )}
        <CtaButton
          url={siteWideSettings?.ctaButton?.url}
          text={siteWideSettings?.ctaButton?.title}
        />
      </div>
    </header>
  )
}

export default Header
