import * as React from 'react'
import { GetStaticProps } from 'next'
import ReactMapGL, { NavigationControl, FullscreenControl } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { ContentType, Language } from 'gql-ts/wp-graphql'
import MapMarkers from 'components/map/MapMarkers'
import { MapPopup } from 'components/map/MapPopup'
import { getCitiesCoords } from 'components/map/utils'
import { mapConfig, initialState, mapCtrlBtnStyle } from 'components/map/config'
import { PreppedMarker, ViewportState, PopupState } from 'components/map/types'
import { ImageCard } from 'components/cards/ImageCard'

import mapStyles from 'components/map/Map.module.css'

type LanguagesProps = {
  data: {
    contentType: ContentType
    languages: Language[]
  }
}

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const [viewport, setViewport] = React.useState<ViewportState>(initialState)
  const [popupInfo, setPopupInfo] = React.useState<PopupState>(null)
  const citiesCoords = getCitiesCoords(languages)
  // const more = [...languages, ...languages, ...languages, ...languages]

  return (
    <Layout title="Languages" summary={contentType?.description}>
      <div className={mapStyles.root}>
        <div className={mapStyles.mapWrap}>
          <ReactMapGL
            {...viewport}
            {...mapConfig}
            onViewportChange={setViewport}
          >
            <MapMarkers
              markers={citiesCoords || ([] as PreppedMarker[])}
              onClick={setPopupInfo}
            />
            {popupInfo && (
              <MapPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
            )}
            <FullscreenControl style={mapCtrlBtnStyle} />
            <NavigationControl style={mapCtrlBtnStyle} />
          </ReactMapGL>
        </div>
        <div className={mapStyles.content}>
          {languages.map((node) => {
            const { uri, title, customInfo } = node
            const { background, endonym } = customInfo || {}

            return (
              <article key={uri} className={mapStyles.contentItem}>
                <ImageCard
                  title={title}
                  subtitle={endonym}
                  uri={uri}
                  summary={background}
                />
              </article>
            )
          })}
        </div>
      </div>
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
