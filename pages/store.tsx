import { Layout } from 'components/Layout'
import { ProductList } from 'components/store/ProductList'
import { Product } from 'gql-ts/wp-graphql'
import { getAllProducts } from 'lib/api/api.store'
import { GetServerSideProps } from 'next'

type Props = {
  data: {
    products: {
      edges: { node: Product }[]
    }
  }
}

const Store: React.FC<Props> = ({
  data: {
    products: { edges },
  },
}) => {
  return (
    <Layout titleTitle="Store" title="Store" summary="Buy the things">
      <ProductList products={edges} />
    </Layout>
  )
}

export default Store

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllProducts()

  return {
    props: { data },
    // revalidate: 300, // TODO: rm if not using
  }
}
