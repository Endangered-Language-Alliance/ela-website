import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'

import { Page } from '../../wp-graphql'

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL as string

function createMarkup(text: string) {
  return { __html: text }
}

const Footer: React.FC = () => {
  const { data, error, isLoading } = useQuery<{ nodeByUri: Page }, Error>(
    'footer',
    async () => {
      const footerData = await request(
        API_URL,
        gql`
          query FooterQuery {
            nodeByUri(uri: "/") {
              ... on Page {
                title
                siteWideSettings {
                  newsletter
                  social {
                    archiveOrg
                    facebook
                    instagram
                    youTube
                  }
                  contactInfo {
                    address
                    email
                    phone
                  }
                }
              }
            }
          }
        `
      )

      return footerData
    },
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading) return null
  if (error || !data) return 'Could not get footer data.'

  const { nodeByUri } = data
  const { siteWideSettings } = nodeByUri
  const { newsletter, contactInfo, social } = siteWideSettings || {}
  const { address, email, phone } = contactInfo || {}
  const { archiveOrg, facebook, instagram, youTube } = social || {}

  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between' }}>
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
    </footer>
  )
}

export default Footer
