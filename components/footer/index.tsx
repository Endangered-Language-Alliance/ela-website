import Link from 'next/link'

import { createMarkup } from 'lib/utils'
import sharedStyles from 'styles/Shared.module.css'

import { useFooterQuery } from './hooks'
import { ContactInfo } from './ContactInfo'
import { TheFinalWord } from './TheFinalWord'
import { SocialIcons } from './SocialIcons'
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
        <nav>
          {nodes?.map((node) => {
            return (
              <>
                <h4 key={node.label}>{node.label}</h4>
                {node.childItems?.nodes?.map((childItem) => (
                  <li key={childItem?.label}>
                    <Link href={childItem?.path || ''} key={childItem?.path}>
                      <a>{childItem?.label}</a>
                    </Link>
                  </li>
                ))}
              </>
            )
          })}
        </nav>
        <div>
          <h3>Subscribe to our mailing list</h3>
          <div dangerouslySetInnerHTML={createMarkup(newsletter || '')} />
        </div>
      </div>
      <TheFinalWord sourceUrl={sourceUrl} title={title}>
        <ContactInfo {...(contactInfo || {})} />
        <SocialIcons {...(social || {})} />
      </TheFinalWord>
    </footer>
  )
}
