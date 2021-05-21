import Link from 'next/link'
import '@reach/menu-button/styles.css'

import { MenuItem } from 'gql-ts/wp-graphql'

import styles from './MobileNav.module.css'

export type MobileNavMenuProps = {
  id: string
  data: MenuItem[]
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = (props) => {
  const { id, data } = props

  return (
    <nav aria-labelledby={id} className={styles.nav}>
      <ul>
        {data.map((node) => {
          const { label, path, childItems, parentId } = node || {}

          if (!parentId && !childItems?.nodes?.length) {
            return (
              <li key={path}>
                <Link href={path || ''}>
                  <a className={styles.link}>{label}</a>
                </Link>
              </li>
            )
          }

          return (
            <li key={path}>
              <h2 className={styles.heading}>{label}</h2>
              <ul className={styles.nestedList}>
                {childItems?.nodes?.map((item) => {
                  return (
                    <li key={item?.path}>
                      <Link href={item?.path || '/'}>
                        <a className={styles.link}>{item?.label}</a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
