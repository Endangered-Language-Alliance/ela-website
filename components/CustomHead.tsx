import Head from 'next/head'
import { LayoutProps } from './types'

const SITE_NAME = 'Endangered Language Alliance'
const SITE_URL = 'https://www.elalliance.org/'
const SITE_LOGO = 'https://www.elalliance.org/ela-logo-hq-black.png'
const SITE_DESC =
  'Founded in 2010, the Endangered Language Alliance (ELA) is a non-profit dedicated to documenting Indigenous, minority, and endangered languages, supporting linguistic diversity in New York City and beyond.'

export const CustomHead: React.FC<LayoutProps> = (props) => {
  const { title, summary } = props
  const { childPages, titleTitle } = props
  const pageTitle = titleTitle || title || ''
  const pageSummary = summary || SITE_DESC

  let pageImgUrl = SITE_LOGO

  // UGHHHHHHH operator-linebreak
  if (childPages && childPages[0] && childPages[0].featuredImage) {
    pageImgUrl = childPages[0].featuredImage.node?.sourceUrl || ''
  }

  const titlePrefix = pageTitle ? `${pageTitle} - ` : ''

  return (
    <Head>
      <meta name="description" content={pageSummary} />
      <meta name="apple-mobile-web-app-title" content="ELA" />
      <meta name="application-name" content={SITE_NAME} />
      <meta property="og:description" content={pageSummary} key="ogdesc" />
      <meta property="og:image" content={pageImgUrl} key="ogimg" />
      <meta property="og:site_name" content={SITE_NAME} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} key="ogurl" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageSummary} />
      <meta name="twitter:image" content={pageImgUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      {/* TODO: favicon, app tile */}
      <link rel="icon" href="/favicon.ico" />
      <title>
        {titlePrefix}
        {SITE_NAME}
      </title>
    </Head>
  )
}
