import { Layout } from 'components/Layout'
import { SearchResults } from 'components/search/SearchResults'
import { GetServerSideProps } from 'next'

const Search: React.FC<{ queryString: string }> = (props) => {
  const { queryString } = props

  return (
    <Layout title={`Search results for "${queryString}"`}>
      <SearchResults />
    </Layout>
  )
}

export default Search

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      queryString: context.query.q,
    },
  }
}
