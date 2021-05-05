import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>{children}</main>
      <Footer />
    </QueryClientProvider>
  );
}
