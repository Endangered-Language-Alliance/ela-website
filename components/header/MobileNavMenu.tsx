import Link from 'next/link'
import '@reach/menu-button/styles.css'

import { MenuItem } from 'gql-ts/wp-graphql'

import mobileNavStyles from './MobileNav.module.css'

export type MobileNavMenuProps = {
  id: string
  data: MenuItem[]
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = (props) => {
  const { id, data } = props

  return (
    <nav aria-labelledby={id} className={mobileNavStyles.mobileNav}>
      <ul>
        {data.map((node) => {
          const { label, path, childItems, parentId } = node || {}

          if (!parentId && !childItems?.nodes?.length) {
            return (
              <li key={path} style={{ marginBottom: 'var(--verticalSpacer)' }}>
                <Link href={path || ''}>
                  <a>{label}</a>
                </Link>
              </li>
            )
          }

          return (
            <li key={path}>
              <h2 className={mobileNavStyles.mobileNavHeading}>{label}</h2>
              <ul className={mobileNavStyles.mobileNavList}>
                {childItems?.nodes?.map((item) => {
                  return (
                    <li key={item?.path}>
                      <Link href={item?.path || '/'}>
                        <a>{item?.label}</a>
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