import getConfig from 'next/config'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const { publicRuntimeConfig } = getConfig()
const { gaTrackingID } = publicRuntimeConfig

// TODO: nextjs.org/docs/api-reference/data-fetching/getInitialProps#typescript
class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          {/* NOTE: the `preload` suggestion did not work */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,700;1,400&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,700;1,400&display=swap"
            media="print"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/earlyaccess/notosanssyriacestrangela.css"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,700;1,400&display=swap"
            />
          </noscript>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];

              function gtag(){dataLayer.push(arguments);}
              
              gtag('js', new Date());
              gtag('config', '${gaTrackingID}', { page_path: window.location.pathname });
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
