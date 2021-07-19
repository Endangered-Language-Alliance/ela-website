import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from './header'
import styles from './Layout.module.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})

// CRED: https://dev.to/anxinyang/page-transition-effect-in-nextjs-9ch
export const TransitionLayout: React.FC = (props) => {
  const { children } = props
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('fadeOut')

  useEffect(() => {
    setTransitionStage('fadeIn')
  }, [])

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage('fadeOut')
  }, [children, setDisplayChildren, displayChildren])

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <div
          onTransitionEnd={() => {
            if (transitionStage === 'fadeOut') {
              setDisplayChildren(children)
              setTransitionStage('fadeIn')
            }
          }}
          className={`${styles.page} ${styles.transitionWrap} ${styles[transitionStage]}`}
        >
          {displayChildren}
        </div>
      </div>
    </QueryClientProvider>
  )
}
