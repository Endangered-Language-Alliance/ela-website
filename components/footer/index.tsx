import Link from 'next/link'

import { createMarkup } from '../../lib/utils'
import { useFooterQuery } from './hooks'

const Footer: React.FC = () => {
  const { data, error, isLoading } = useFooterQuery()

  if (isLoading) return null
  if (error || !data) return <footer>Could not get footer data.</footer>

  const { nodeByUri, generalSettings, menuItems } = data
  const { siteWideSettings } = nodeByUri
  const { newsletter, contactInfo, social, logo } = siteWideSettings || {}
  const { address, email, phone } = contactInfo || {}
  const { archiveOrg, facebook, instagram, youTube } = social || {}
  const { title } = generalSettings
  const { altText, sourceUrl } = logo || {}
  const { nodes } = menuItems || {}

  return (
    <footer>
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>Newsletter</h3>
          <div dangerouslySetInnerHTML={createMarkup(newsletter || '')} />
        </div>
        <div>
          <h3>Contact Info</h3>
          <address>
            <a href={`tel:+${phone}`}>{phone}</a>
            <br />
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            {address}
          </address>
        </div>
        <div>
          <h3>Social</h3>
          <ul>
            <li>
              <a href={archiveOrg || ''} target="blank">
                archiveOrg
              </a>
            </li>
            <li>
              <a href={facebook || ''} target="blank">
                facebook
              </a>
            </li>
            <li>
              <a href={instagram || ''} target="blank">
                instagram
              </a>
            </li>
            <li>
              <a href={youTube || ''} target="blank">
                youTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <img src={sourceUrl || ''} alt={altText || ''} />
        </div>
        <small>
          &copy; Copyright {new Date().getFullYear()}, {title}
        </small>
      </div>
    </footer>
  )
}

export default Footer
