import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { pageview } from 'lib/gtag'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
