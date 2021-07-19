import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { pageview } from 'lib/gtag'
import { TransitionLayout } from 'components/TransitionLayout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      pageview(url)

      const scrollWrapElem = document.getElementById('scroll-wrap') // 🤮 🤮 🤮

      if (scrollWrapElem) scrollWrapElem.scroll(0, 0)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <TransitionLayout>
      <Component {...pageProps} />
    </TransitionLayout>
  )
}

export default MyApp
