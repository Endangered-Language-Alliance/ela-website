import { Product as WpProduct } from 'gql-ts/wp-graphql'
import { Product } from './Product'

type Props = {
  products: {
    node: WpProduct
  }[]
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products?.map(({ node }) => (
        <Product key={node.id} {...node} />
      ))}
    </>
  )
}
