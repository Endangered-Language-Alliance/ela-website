import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Footer } from './footer'
import Header from './header'
import sharedStyles from '../styles/Shared.module.css'

const queryClient = new QueryClient()

export const Layout: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* TODO: Head */}
      <Header />
      <main className={`${sharedStyles.container} ${sharedStyles.main}`}>
        {children}
      </main>
      <Footer />
    </QueryClientProvider>
  )
}
