import { Language_Custominfo_External, Project } from 'gql-ts/wp-graphql'
import Link from 'next/link'

import chipStyles from 'components/buttons/Chip.module.css'
import styles from './Languages.module.css'

export type LangInstanceLinksListProps = {
  external?: Language_Custominfo_External
  project?: Project
}

export const LangInstanceLinksList: React.FC<LangInstanceLinksListProps> = (
  props
) => {
  const { project, external } = props
  const { archiveOrgLink, nycLangMap } = external || {}

  return (
    <ul className={styles.root}>
      {project && (
        <li className={`${chipStyles.chip} ${chipStyles.primary}`}>
          <Link href={project.uri || ''}>
            <a>Project: {project.title}</a>
          </Link>
        </li>
      )}
      {archiveOrgLink && (
        <li className={`${chipStyles.chip} ${chipStyles.primary}`}>
          <a href={archiveOrgLink}>Archive.org</a>
        </li>
      )}
      {nycLangMap && (
        <li className={`${chipStyles.chip} ${chipStyles.primary}`}>
          <a href={nycLangMap}>Languages of NYC Map</a>
        </li>
      )}
      {/* TODO: Glotto? */}
    </ul>
  )
}
