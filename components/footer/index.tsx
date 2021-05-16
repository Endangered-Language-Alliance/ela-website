import Link from 'next/link'

import sharedStyles from 'components/Layout.module.css'

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
  const { newsletter, contactInfo, social, logo } = siteWideSettings || {}
  const { title } = generalSettings
  const { sourceUrl } = logo || {}
  const { nodes } = menuItems || {}

  return (
    <footer className={styles.footer}>
      <div className={`${sharedStyles.container} ${styles.footer__wrap}`}>
        <div>
          <h3>Subscribe to our mailing list</h3>
          <div dangerouslySetInnerHTML={{ __html: newsletter || '' }} />
        </div>
        <nav>
          {nodes?.map((node) => {
            return (
              <div key={node.label}>
                <h3>{node.label}</h3>
                {node.childItems?.nodes && (
                  <ul className={styles.navList}>
                    {node.childItems.nodes.map((childItem) => (
                      <li key={childItem?.label}>
                        <Link
                          href={childItem?.path || ''}
                          key={childItem?.path}
                        >
                          <a>{childItem?.label}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
        <div className={styles.final}>
          <img src={sourceUrl || ''} alt="ELA logo" className={styles.logo} />
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
