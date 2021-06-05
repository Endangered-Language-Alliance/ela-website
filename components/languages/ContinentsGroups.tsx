import Link from 'next/link'

import { getIconColorByContinent } from 'components/map/utils'
import { Continent, ContinentGroup } from 'components/languages/types'
import { MarkerIcon } from 'components/map/MarkerIcon'

import cardStyles from 'components/cards/Card.module.css'
import mapStyles from 'components/map/Map.module.css'

export type ContinentsGroupsProps = {
  continentGroups: ContinentGroup
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
    <header className={cardStyles.header}>
      <Link href={href}>
        <h4 className={cardStyles.title}>
          <a>{title}</a>
        </h4>
      </Link>
      <div role="doc-subtitle" className={cardStyles.subtitle}>
        {subtitle}
      </div>
    </header>
  )
}

const ItemIcon: React.FC<ItemIconProps> = (props) => {
  const { color, label } = props

  return (
    <div className={mapStyles.marker}>
      <MarkerIcon markerLabel={label} iconColor={color} />
    </div>
  )
}

export const ContinentsGroups: React.FC<ContinentsGroupsProps> = (props) => {
  const { continentGroups } = props

  return (
    <div className={cardStyles.fourSquares}>
      {Object.keys(continentGroups)
        .sort()
        .map((group) => {
          const continentName = group as Continent
          let locsCount = 0

          const continentGroup = continentGroups[continentName].map((node) => {
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

                  locsCount += 1

                  return (
                    <ItemIcon
                      key={city}
                      label={locsCount}
                      color={getIconColorByContinent(continent)}
                    />
                  )
                })}
              </div>
            )

            return (
              <article key={uri}>
                <ItemHeader
                  href={uri || ''}
                  title={title || ''}
                  subtitle={endonym || title || ''}
                />
                {markersList}
              </article>
            )
          })

          return (
            <div key={group} className={cardStyles.fourSquaresItem}>
              <h3 className={cardStyles.groupHeader}>{continentName}</h3>
              <div className={cardStyles.list}>{continentGroup}</div>
            </div>
          )
        })}
    </div>
  )
}
