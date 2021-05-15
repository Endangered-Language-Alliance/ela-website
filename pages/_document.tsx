import Document, { Html, Head, Main, NextScript } from 'next/document'

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
          {/* Note that the `preload` suggestion did not work */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;700&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;700&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap"
            media="print"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;700&family=Tinos:ital,wght@0,400;0,700;1,400&display=swap"
            />
          </noscript>
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
