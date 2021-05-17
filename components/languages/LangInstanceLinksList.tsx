import { Language_Custominfo_External, Project } from 'gql-ts/wp-graphql'
import Link from 'next/link'

import btnStyles from 'components/buttons/Button.module.css'
import styles from './Languages.module.css'

export type LangInstanceLinksListProps = {
  external?: null | Language_Custominfo_External
  project?: null | Project
}

export const LangInstanceLinksList: React.FC<LangInstanceLinksListProps> = (
  props
) => {
  const { project, external } = props
  const { archiveOrgLink, nycLangMap } = external || {}
  const { button, primary, small } = btnStyles
  const btnClasses = `${button} ${primary} ${small}`

  return (
    <ul className={styles.linksList}>
      {project && (
        <li>
          <Link href={project.uri || ''}>
            <a className={btnClasses}>Project: {project.title}</a>
          </Link>
        </li>
      )}
      {archiveOrgLink && (
        <li>
          <a className={btnClasses} href={archiveOrgLink}>
            Archive.org
          </a>
        </li>
      )}
      {nycLangMap && (
        <li>
          <a className={btnClasses} href={nycLangMap}>
            Languages of NYC Map
          </a>
        </li>
      )}
      {/* TODO: Glotto? */}
    </ul>
  )
}
