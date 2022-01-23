import { Button } from 'components/buttons/Button'
import { Product as WpProduct } from 'gql-ts/wp-graphql'
import { OnSaleBadge } from './OnSaleBadge'
import { ProductImage } from './ProductImage'
import { ProductQuantity } from './ProductQuantity'

import styles from './Store.module.css'

type Props = WpProduct

export const Product: React.FC<Props> = (props) => {
  const { shortDescription, image, id, name, onSale } = props

  function addToCart(): void {
    // eslint-disable-next-line no-console
    console.log(`ADDING TO CART: ${id}`)
  }

  function adjustProductQuantity(quantity: number): void {
    // eslint-disable-next-line no-console
    console.log(`NEW QUANTITY: ${quantity}`)
  }

  return (
    <div className={styles.product}>
      <ProductImage image={image} name={name} />
      <div className={styles.productMain}>
        <div className={styles.productTitle}>
          <h3 className={styles.productName}>{name}</h3>
          {onSale && <OnSaleBadge />}
        </div>
        <div
          className={styles.productDescrip}
          dangerouslySetInnerHTML={{ __html: shortDescription || '' }}
        />
        <div className={styles.productFooter}>
          <ProductQuantity handleChange={adjustProductQuantity}>
            adjust quantity
          </ProductQuantity>
          <Button onClick={addToCart}>Add to cart</Button>
        </div>
      </div>
    </div>
  )
}
