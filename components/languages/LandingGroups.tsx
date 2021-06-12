import Link from 'next/link'

import { MarkerIcon } from 'components/map/MarkerIcon'

import cardStyles from 'components/cards/Card.module.css'
import mapStyles from 'components/map/Map.module.css'
import btnSyles from 'components/buttons/Button.module.css'

import {
  GroupConfig,
  GroupProps,
  GroupsProps,
  ItemProps,
  ItemIconProps,
} from './types'

const GroupCardItem: React.FC<ItemProps> = (props) => {
  const { title, subtitle, href, children } = props

  return (
    <Link href={href}>
      <a className={cardStyles.item}>
        <header className={cardStyles.itemHeader}>
          <h4 className={cardStyles.itemTitle}>{title}</h4>
          <div role="doc-subtitle" className={cardStyles.itemSubtitle}>
            {subtitle}
          </div>
        </header>
        <div className={mapStyles.markersList}>{children}</div>
      </a>
    </Link>
  )
}

const GroupMarkerIcon: React.FC<ItemIconProps> = (props) => {
  const { color, label, noTransform } = props
  const transform = noTransform ? { transform: 'unset' } : {}

  return (
    <div
      className={mapStyles.marker}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style={{ '--size': '24px', ...transform }}
    >
      <MarkerIcon markerLabel={label} iconColor={color} />
    </div>
  )
}

export const Group: React.FC<GroupProps> = (props) => {
  const { name, color, children } = props

  return (
    <div className={cardStyles.group} style={{ borderColor: color }}>
      <div
        className={cardStyles.groupTitleWrap}
        style={{ backgroundColor: color }}
      >
        <h3 className={cardStyles.groupTitle}>{name}</h3>
      </div>
      <div className={cardStyles.itemList}>{children}</div>
    </div>
  )
}

const ProjectGroup: React.FC<GroupProps> = (props) => {
  const { name, color, children } = props

  return (
    <div className={cardStyles.projectGroup}>
      <h3
        className={cardStyles.projectGroupTitle}
        style={{ backgroundColor: color }}
      >
        {name}
      </h3>
      <div className={cardStyles.projectGroupInner}>{children}</div>
    </div>
  )
}

export const ContinentGroups: React.FC<GroupsProps> = (props) => {
  const { groups } = props
  const classes = `${cardStyles.root} ${cardStyles.widerGrid}`

  function getGroups({ name, color, items }: GroupConfig): React.ReactNode {
    return (
      <Group key={name} name={name} color={color}>
        {items.map(({ href, title, subtitle, markers }) => (
          <GroupCardItem
            key={href}
            href={href}
            title={title}
            subtitle={subtitle}
          >
            {markers.map(({ markerLabel }) => (
              <GroupMarkerIcon
                key={markerLabel}
                label={markerLabel}
                color={color}
              />
            ))}
          </GroupCardItem>
        ))}
      </Group>
    )
  }

  return <div className={classes}>{groups.map(getGroups)}</div>
}

const ProjectLangItem: React.FC<Omit<ItemProps, 'href'>> = (props) => {
  const { title, subtitle, children } = props

  return (
    <div key={title} className={cardStyles.projectLangItem}>
      <div>
        <h4 className={cardStyles.projectLangItemTitle}>{title}</h4>
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

export const ProjectGroups: React.FC<GroupsProps> = (props) => {
  const { groups } = props
  const rootClasses = `${cardStyles.root} ${cardStyles.projectGroups}`

  return (
    <div className={rootClasses}>
      {groups.map(({ name, color, items, href }) => (
        <ProjectGroup key={name} name={name} color={color}>
          <div className={cardStyles.projectItemsWrap}>
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
              className={`${btnSyles.button} ${btnSyles.secondary} ${cardStyles.projectCtaBtn}`}
            >
              View project
            </a>
          </Link>
        </ProjectGroup>
      ))}
    </div>
  )
}
