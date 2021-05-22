import Link from 'next/link'
import { getIconColorByContinent } from 'components/map/utils'
import { Continent, ContinentGroup } from 'components/languages/types'
import { MarkerIcon } from 'components/map/MarkerIcon'

import cardStyles from 'components/cards/Card.module.css'
import mapStyles from 'components/map/Map.module.css'

export type ContinentsGroupsProps = {
  continentGroups: ContinentGroup
}

export const ContinentsGroups: React.FC<ContinentsGroupsProps> = (props) => {
  const { continentGroups } = props

  return (
    <div className={cardStyles.fourSquares}>
      {Object.keys(continentGroups).map((group) => {
        const continentName = group as Continent

        return (
          <div key={group} className={cardStyles.fourSquaresItem}>
            <h3 className={cardStyles.groupHeader}>{continentName}</h3>
            <div className={cardStyles.list}>
              {continentGroups[continentName].map((node) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const { uri, title, customInfo, langLocations } = node
                const { endonym } = customInfo || {}

                return (
                  <article key={uri}>
                    <Link href={uri || ''}>
                      <a>
                        <header className={cardStyles.header}>
                          <h4 className={cardStyles.title}>{title || ''}</h4>
                        </header>
                      </a>
                    </Link>
                    <h5 className={cardStyles.subtitle}>
                      {endonym || title || ''}
                    </h5>
                    {langLocations?.nodes && (
                      <div className={mapStyles.markersList}>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        {langLocations?.nodes.map((loc) => {
                          return (
                            <div
                              className={mapStyles.marker}
                              key={loc?.languageLocation?.city}
                            >
                              <MarkerIcon
                                city={loc?.languageLocation?.city}
                                iconColor={getIconColorByContinent(
                                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-ignore
                                  loc?.languageLocation?.continent
                                )}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
