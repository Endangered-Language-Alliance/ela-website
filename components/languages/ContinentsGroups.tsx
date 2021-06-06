import Link from 'next/link'

import { MarkerIcon } from 'components/map/MarkerIcon'

import cardStyles from 'components/cards/Card.module.css'
import mapStyles from 'components/map/Map.module.css'

import {
  GroupConfig,
  GroupProps,
  GroupsProps,
  ItemProps,
  ItemIconProps,
} from './types'

const Item: React.FC<ItemProps> = (props) => {
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

const ItemIcon: React.FC<ItemIconProps> = (props) => {
  const { color, label } = props

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div className={mapStyles.marker} style={{ '--size': '24px' }}>
      <MarkerIcon markerLabel={label} iconColor={color} />
    </div>
  )
}

const Group: React.FC<GroupProps> = (props) => {
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

export const Groups: React.FC<GroupsProps> = (props) => {
  const { groups, widerGrid } = props
  const classes = `${cardStyles.root} ${
    widerGrid && ` ${cardStyles.widerGrid}`
  }`

  function getGroups({ name, color, items }: GroupConfig): React.ReactNode {
    return (
      <Group key={name} name={name} color={color}>
        {items.map(({ href, title, subtitle, markers }) => (
          <Item key={href} href={href} title={title} subtitle={subtitle}>
            {markers.map(({ markerLabel }) => (
              <ItemIcon key={markerLabel} label={markerLabel} color={color} />
            ))}
          </Item>
        ))}
      </Group>
    )
  }

  return <div className={classes}>{groups.map(getGroups)}</div>
}
