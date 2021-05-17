import { useState } from 'react'
import { GetStaticProps } from 'next'
import { LngLatBounds, Map as MbMap } from 'mapbox-gl'

import ReactMapGL, { NavigationControl, FullscreenControl } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { ContentType, Language } from 'gql-ts/wp-graphql'
import MapMarkers from 'components/map/MapMarkers'
import { MapPopup } from 'components/map/MapPopup'
import { getCitiesCoords } from 'components/map/utils'
import { mapConfig, initialState, mapCtrlBtnStyle } from 'components/map/config'
import {
  PreppedMarker,
  ViewportState,
  PopupState,
  ZoomEndEvent,
} from 'components/map/types'
import { ImageCard } from 'components/cards/ImageCard'

import mapStyles from 'components/map/Map.module.css'

type LanguagesProps = {
  data: {
    contentType: ContentType
    languages: Language[]
  }
}

// TODO: init clusters:
// https://github.com/visgl/react-map-gl/tree/6.1-release/examples/clusters/src
const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const [viewport, setViewport] = useState<ViewportState>(initialState)
  const [popupInfo, setPopupInfo] = useState<PopupState>(null)
  const [mapIsMoving, setMapIsMoving] = useState<boolean>(true)
  const preppedData = getCitiesCoords(languages)
  // const more = [...languages, ...languages, ...languages, ...languages]

  function onLoad(mapLoadEvent: { target: MbMap }): void {
    const { target: map } = mapLoadEvent
    const bounds = new LngLatBounds()

    preppedData.forEach(({ lon, lat }) => {
      if (lon && lat) bounds.extend([lon, lat])
    })

    // Maintain viewport state sync if needed (e.g. after `flyTo`), otherwise
    // the map shifts back to previous position after panning or zooming.
    map.on('moveend', function onMoveEnd(zoomEndEvent: ZoomEndEvent): void {
      setMapIsMoving(false)

      // No custom event data, regular move event
      if (zoomEndEvent.forceViewportUpdate) {
        setViewport({
          ...viewport, // spreading just in case bearing or pitch are added
          latitude: map.getCenter().lat,
          longitude: map.getCenter().lng,
          pitch: map.getPitch(),
          zoom: map.getZoom(),
        })
      }
    })

    map.on('movestart', function onMoveStart(zoomEndEvent: ZoomEndEvent): void {
      if (zoomEndEvent.forceViewportUpdate) setMapIsMoving(true)
    })

    map.fitBounds(bounds, { padding: 50 }, { forceViewportUpdate: true })
  }

  return (
    <Layout title="Languages" summary={contentType?.description}>
      <div className={mapStyles.root}>
        <div className={mapStyles.mapWrap}>
          <ReactMapGL
            {...viewport}
            {...mapConfig}
            onViewportChange={setViewport}
            onLoad={onLoad}
          >
            {!mapIsMoving && (
              <MapMarkers
                markers={preppedData || ([] as PreppedMarker[])}
                onClick={setPopupInfo}
              />
            )}
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
