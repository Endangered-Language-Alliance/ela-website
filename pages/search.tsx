import { Layout } from 'components/Layout'
import { SearchResults } from 'components/search/SearchResults'

const Search: React.FC = () => {
  return (
    <Layout title="Search results">
      <SearchResults />
    </Layout>
  )
}
export default Search
