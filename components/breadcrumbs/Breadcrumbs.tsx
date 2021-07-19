// CRED: for much of this file:
// https://github.com/NiklasMencke/nextjs-breadcrumbs/blob/main/src/index.js
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from './Breadcrumbs.module.css'
import { convertBreadcrumb } from './utils'
import { CrumbProps } from './types'

const Crumb: React.FC<CrumbProps> = (props) => {
  const { text, href } = props

  if (!href) return <span>{convertBreadcrumb(text)}</span>

  return (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  )
}

export const Breadcrumbs: React.FC = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<CrumbProps[] | null>(null)

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
      linkPath.shift()

      const pathArray = linkPath.map((path, i) => {
        return {
          text: convertBreadcrumb(path),
          href: `/${linkPath.slice(0, i + 1).join('/')}`,
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs || breadcrumbs.length === 1) {
    // Reduce layout jank on page transition
    return <div className={styles.root} />
  }

  return (
    <nav aria-label="breadcrumbs" className={styles.root}>
      <p className={styles.list}>
        <Crumb href="/" text="Home" />
        {breadcrumbs.map(({ href, text }, i) => {
          const lastOne = i === breadcrumbs.length - 1

          return lastOne ? null : (
            <Fragment key={href}>
              <span className={styles.separator} aria-hidden="true">
                /
              </span>
              <Crumb href={lastOne ? '' : href} text={text} />
            </Fragment>
          )
        })}
      </p>
    </nav>
  )
}
