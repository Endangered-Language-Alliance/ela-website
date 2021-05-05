import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Footer from './footer'
import Header from './header'

const queryClient = new QueryClient()

export const Layout: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>{children}</main>
      <Footer />
    </QueryClientProvider>
  )
}
