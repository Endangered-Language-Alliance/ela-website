import { QueryClient, QueryClientProvider } from 'react-query'

import sharedStyles from 'styles/Shared.module.css'
import { Footer } from './footer'
import Header from './header'

const queryClient = new QueryClient()

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={sharedStyles.page}>
      <QueryClientProvider client={queryClient}>
        {/* TODO: Head */}
        <Header />
        <main className={`${sharedStyles.container} ${sharedStyles.main}`}>
          {children}
        </main>
        <Footer />
      </QueryClientProvider>
    </div>
  )
}
