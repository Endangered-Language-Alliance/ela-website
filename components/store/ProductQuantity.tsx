import { useState } from 'react'

import styles from './Store.module.css'

type Props = {
  handleChange: (quantity: number) => void
}

export const ProductQuantity: React.FC<Props> = ({ handleChange }) => {
  const [count, setCount] = useState<number>(1)

  const Menu = (
    <select
      value={count}
      onChange={({ target: { value } }) => {
        const quantityInt = parseInt(value, 10)

        setCount(quantityInt)
        handleChange(quantityInt)
      }}
    >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
  )

  return <div className={styles.productQuantity}>Quantity {Menu}</div>
}
