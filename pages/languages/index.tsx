import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { Map } from 'components/map/Map'
import { getCitiesCoords, getIconColorByContinent } from 'components/map/utils'
import { LanguagesProps } from 'components/languages/types'
import { CardList, Card } from 'components/cards/Card'

import mapStyles from 'components/map/Map.module.css'
import { MarkerIcon } from 'components/map/MarkerIcon'

// TODO: init clusters:
// https://github.com/visgl/react-map-gl/tree/6.1-release/examples/clusters/src
const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const preppedData = getCitiesCoords(languages)

  return (
    <Layout
      title="Languages"
      summary={contentType?.description}
      tweenerContent={
        <div className={mapStyles.fullWidthMap}>
          <Map preppedData={preppedData} />
        </div>
      }
    >
      <CardList>
        {languages.map((node) => {
          const { uri, title, customInfo, langLocations } = node
          const { endonym } = customInfo || {}

          return (
            <Card
              key={uri}
              title={title || ''}
              uri={uri || ''}
              subtitle={endonym || title || ''}
            >
              {langLocations?.nodes && (
                <div className={mapStyles.markersList}>
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
            </Card>
          )
        })}
      </CardList>
    </Layout>
  )
}

export default Languages

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllLanguages()

  return {
    props: { data },
    revalidate: 10,
  }
}
