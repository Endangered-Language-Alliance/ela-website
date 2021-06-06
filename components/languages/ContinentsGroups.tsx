import Link from 'next/link'

import { getIconColorByContinent } from 'components/map/utils'
import { Continent, ContinentGroup } from 'components/languages/types'
import { MarkerIcon } from 'components/map/MarkerIcon'

import cardStyles from 'components/cards/Card.module.css'
import mapStyles from 'components/map/Map.module.css'

export type ContinentsGroupsProps = {
  groups: ContinentGroup
}

export type ItemHeaderProps = {
  href: string
  title: string
  subtitle: string
}

export type ItemIconProps = {
  label: string | number
  color: string
}

const ItemHeader: React.FC<ItemHeaderProps> = (props) => {
  const { href, title, subtitle } = props

  return (
    <header className={cardStyles.itemHeader}>
      <Link href={href}>
        <h4 className={cardStyles.itemTitle}>
          <a>{title}</a>
        </h4>
      </Link>
      <div role="doc-subtitle" className={cardStyles.itemSubtitle}>
        {subtitle}
      </div>
    </header>
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

export const ContinentsGroups: React.FC<ContinentsGroupsProps> = (props) => {
  const { groups } = props

  return (
    <div className={cardStyles.root}>
      {Object.keys(groups)
        .sort()
        .map((groupName) => {
          let locsCount = 0

          const groupItems = groups[groupName as Continent].map((node) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { uri, title, customInfo, langLocations } = node
            const { endonym } = customInfo || {}

            const markersList = langLocations?.nodes && (
              <div className={mapStyles.markersList}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                {langLocations?.nodes.map(({ languageLocation }) => {
                  const { city, continent } = languageLocation
                  const color = getIconColorByContinent(continent)

                  locsCount += 1

                  return <ItemIcon key={city} label={locsCount} color={color} />
                })}
              </div>
            )

            return (
              <article key={uri} className={cardStyles.item}>
                <ItemHeader
                  href={uri || ''}
                  title={title || ''}
                  subtitle={endonym || title || ''}
                />
                {markersList}
              </article>
            )
          })

          const backgroundColor = getIconColorByContinent(
            groupName as Continent
          )

          return (
            <div
              key={groupName}
              className={cardStyles.group}
              style={{ borderBottomColor: backgroundColor }}
            >
              <div
                className={cardStyles.groupTitleWrap}
                style={{ backgroundColor }}
              >
                <h3 className={cardStyles.groupTitle}>{groupName}</h3>
              </div>
              <div className={cardStyles.itemList}>{groupItems}</div>
            </div>
          )
        })}
    </div>
  )
}
