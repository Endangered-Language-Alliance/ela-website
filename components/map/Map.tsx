import { useState } from 'react'
import { LngLatBounds, Map as MbMap } from 'mapbox-gl'
import ReactMapGL, { NavigationControl, FullscreenControl } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import MapMarkers from './MapMarkers'
import { MapPopup } from './MapPopup'
import { mapConfig, initialState } from './config'
import {
  PreppedMarker,
  ViewportState,
  PopupState,
  ZoomEndEvent,
  MapProps,
} from './types'
import styles from './Map.module.css'

export const Map: React.FC<MapProps> = (props) => {
  const {
    preppedMarkerData = [],
    excludePopupLinkBtn,
    noNegativeMargin,
  } = props
  const [viewport, setViewport] = useState<ViewportState>(initialState)
  const [popupInfo, setPopupInfo] = useState<PopupState | null>(null)
  const [mapIsMoving, setMapIsMoving] = useState<boolean>(true)
  const rootClasses = noNegativeMargin ? '' : styles.fullWidthMap

  function onLoad(mapLoadEvent: { target: MbMap }): void {
    const { target: map } = mapLoadEvent

    // Maintain viewport state sync if needed (e.g. after `flyTo`), otherwise
    // the map shifts back to previous position after panning or zooming.
    map.on('moveend', function onMoveEnd(zoomEndEvent: ZoomEndEvent): void {
      setMapIsMoving(false)

      if (zoomEndEvent.forceViewportUpdate) {
        const zoom = map.getZoom()

        setViewport({
          ...viewport, // spreading just in case bearing or pitch are added
          latitude: map.getCenter().lat,
          longitude: map.getCenter().lng,
          pitch: map.getPitch(),
          // Prevent empty map at global extent on small screens
          zoom: zoom < 0 ? 0 : zoom,
        })
      }
    })

    map.on('movestart', function onMoveStart(zoomEndEvent: ZoomEndEvent): void {
      if (zoomEndEvent.forceViewportUpdate) setMapIsMoving(true)
    })

    // Avoid crazy zoom if only one marker
    if (preppedMarkerData.length === 1) {
      map.easeTo(
        {
          center: [
            preppedMarkerData[0]?.lon || 0,
            preppedMarkerData[0]?.lat || 0,
          ],
          zoom: 4,
        },
        { forceViewportUpdate: true }
      )

      return
    }

    const bounds = new LngLatBounds()

    preppedMarkerData.forEach(({ lon, lat }) => {
      if (lon && lat) bounds.extend([lon, lat])
    })

    const boundsSettings = {
      // Prevent top markers from getting cut off on mobile
      padding: { top: 35, bottom: 25, left: 25, right: 25 },
      around: bounds.getCenter(),
    }

    try {
      map.fitBounds(bounds, boundsSettings, { forceViewportUpdate: true })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div
      style={{ height: 'max(285px, 22vh)' }}
      className={`${styles.mapRoot} ${rootClasses}`}
    >
      <ReactMapGL
        {...viewport}
        {...mapConfig}
        onViewportChange={setViewport}
        onLoad={onLoad}
        className={styles.map}
      >
        {!mapIsMoving && (
          <MapMarkers
            markers={preppedMarkerData || ([] as PreppedMarker[])}
            onClick={setPopupInfo}
          />
        )}
        {popupInfo && (
          <MapPopup
            excludePopupLinkBtn={excludePopupLinkBtn}
            popupInfo={popupInfo}
            setPopupInfo={setPopupInfo}
          />
        )}
        <FullscreenControl
          className={`${styles.mapBtns} ${styles.mapFullscreenBtn}`}
        />
        <NavigationControl
          className={`${styles.mapBtns} ${styles.mapNavBtns}`}
        />
      </ReactMapGL>
    </div>
  )
}
