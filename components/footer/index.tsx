import Link from 'next/link'

import sharedStyles from 'components/Layout.module.css'
import { Logo } from 'components/header/Logo'
import { prodHostName, siteMapUri } from 'lib/config'

import { useFooterQuery } from './hooks'
import { SocialIcons } from './SocialIcons'
import { ContactInfo } from './ContactInfo'

import styles from './Footer.module.css'

export const Footer: React.FC = () => {
  const { data, error, isLoading } = useFooterQuery()

  if (isLoading) return null
  if (error || !data) return <footer>Could not get footer data.</footer>

  const { nodeByUri, generalSettings, menuItems } = data
  const { siteWideSettings } = nodeByUri
  const { newsletter, contactInfo, social } = siteWideSettings || {}
  const { title } = generalSettings
  const { nodes } = menuItems || {}

  return (
    <footer className={styles.footer}>
      <div className={`${sharedStyles.container} ${styles.footer__wrap}`}>
        <div className={styles.newsletter}>
          <h3 className={styles.heading}>Join our mailing list</h3>
          <div dangerouslySetInnerHTML={{ __html: newsletter || '' }} />
        </div>
        <nav className={styles.nav}>
          {/* TODO: allow standalone links w/o a heading and child items? */}
          {nodes?.map((node) => {
            return (
              <div key={node.label}>
                <h3 className={styles.heading}>{node.label}</h3>
                {node.childItems?.nodes && (
                  <ul className={styles.navList}>
                    {node.childItems.nodes.map((childItem) => (
                      <li key={childItem?.label}>
                        <Link href={childItem?.path || ''}>
                          <a>{childItem?.label}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
          {/* Sitemap internal so far */}
          {window?.location?.hostname !== prodHostName && (
            <ul className={styles.navList}>
              <li>
                <Link href={siteMapUri}>
                  <a>Sitemap (not seen in prod)</a>
                </Link>
              </li>
            </ul>
          )}
        </nav>
        <div className={styles.final}>
          <Logo />
          <small className={styles.copyright}>
            &copy; Copyright {new Date().getFullYear()}, {title}
          </small>
          <ContactInfo {...(contactInfo || {})} />
          <SocialIcons {...(contactInfo || {})} {...(social || {})} />
        </div>
      </div>
    </footer>
  )
}
