import Link from 'next/link'

import btnSyles from 'components/buttons/Button.module.css'
import cardStyles from 'components/cards/Card.module.css'

import { GroupProps, GroupsProps, ItemProps } from 'components/languages/types'
import { GroupMarkerIcon } from 'components/languages/LandingGroups'

import styles from './Projects.module.css'

const ProjectLangItem: React.FC<Omit<ItemProps, 'href'>> = (props) => {
  const { title, subtitle, children } = props

  return (
    <div key={title} className={styles.item}>
      <div>
        <h4 className={styles.itemTitle}>{title}</h4>
        {subtitle !== title && (
          <div
            role="doc-subtitle"
            className={cardStyles.itemSubtitle}
            style={{ marginBottom: 0 }}
          >
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  )
}

const ProjectGroup: React.FC<GroupProps> = (props) => {
  const { name, color, children } = props

  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle} style={{ backgroundColor: color }}>
        {name}
      </h3>
      <div className={styles.groupInner}>{children}</div>
    </div>
  )
}

export const ProjectGroups: React.FC<GroupsProps> = (props) => {
  const { groups } = props
  const rootClasses = `${cardStyles.root} ${styles.groups}`

  return (
    <div className={rootClasses}>
      {groups.map(({ name, color, items, href }) => (
        <ProjectGroup key={name} name={name} color={color}>
          <div className={styles.itemsWrap}>
            {items.map(({ title, subtitle, markers }) => (
              <ProjectLangItem key={title} title={title} subtitle={subtitle}>
                {markers.map(({ markerLabel }) => (
                  <GroupMarkerIcon
                    key={markerLabel}
                    label={markerLabel}
                    color={color}
                    noTransform
                  />
                ))}
              </ProjectLangItem>
            ))}
          </div>
          <Link href={href || ''}>
            <a
              className={`${btnSyles.button} ${btnSyles.secondary} ${styles.ctaBtn}`}
            >
              View project
            </a>
          </Link>
        </ProjectGroup>
      ))}
    </div>
  )
}
