import Link from 'next/link'

import { slugToTitleCase } from 'lib/utils'
import styles from './Breadcrumbs.module.css'

export type CrumbProps = {
  text: string
  uri?: string
}

const Crumb: React.FC<CrumbProps> = (props) => {
  const { text, uri } = props

  if (!uri) return <span>{text}</span>

  return (
    <Link href={uri}>
      <a>{text}</a>
    </Link>
  )
}

export const Breadcrumbs: React.FC = () => {
  if (!process.browser || window?.location.pathname === '/') return null

  const paths = window?.location.pathname.split('/')

  return (
    <nav>
      <p className={styles.list}>
        {paths.map((path, i) => (
          <Crumb
            key={path}
            text={slugToTitleCase(path) || 'Home'}
            uri={i === paths.length - 1 ? '' : path || '/'}
          />
        ))}
      </p>
    </nav>
  )
}
