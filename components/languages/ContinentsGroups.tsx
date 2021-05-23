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
      {Object.keys(continentGroups)
        .sort()
        .map((group) => {
          const continentName = group as Continent
          let locsCount = 0

          return (
            <div key={group} className={cardStyles.fourSquaresItem}>
              <h3 className={cardStyles.groupHeader}>{continentName}</h3>
              <div className={cardStyles.list}>
                {continentGroups[continentName]
                  /* eslint-disable @typescript-eslint/ban-ts-comment */
                  // @ts-ignore
                  .map((node) => {
                    // @ts-ignore
                    const { uri, title, customInfo, langLocations } = node
                    const { endonym } = customInfo || {}

                    return (
                      <article key={uri}>
                        <Link href={uri || ''}>
                          <a>
                            <header className={cardStyles.header}>
                              <h4 className={cardStyles.title}>
                                {title || ''}
                              </h4>
                            </header>
                          </a>
                        </Link>
                        <h5 className={cardStyles.subtitle}>
                          {endonym || title || ''}
                        </h5>
                        {langLocations?.nodes && (
                          <div className={mapStyles.markersList}>
                            {/* @ts-ignore */}
                            {langLocations?.nodes.map((loc) => {
                              locsCount += 1

                              return (
                                <div
                                  className={mapStyles.marker}
                                  key={loc?.languageLocation?.city}
                                >
                                  <MarkerIcon
                                    markerLabel={locsCount}
                                    iconColor={getIconColorByContinent(
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
                    /* eslint-disable @typescript-eslint/ban-ts-comment */
                  })}
              </div>
            </div>
          )
        })}
    </div>
  )
}
