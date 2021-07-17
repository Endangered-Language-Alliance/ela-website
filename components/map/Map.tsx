import { Map as MbMap } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'

import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  InteractiveMap,
} from 'react-map-gl'

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
import { zoomToMarkersExtent } from './utils'

export const Map: React.FC<MapProps> = (props) => {
  const {
    preppedMarkerData = [],
    excludePopupLinkBtn,
    noNegativeMargin,
  } = props
  const [viewport, setViewport] = useState<ViewportState>(initialState)
  const [popupInfo, setPopupInfo] = useState<PopupState | null>(null)
  const [mapIsMoving, setMapIsMoving] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const rootClasses = noNegativeMargin ? '' : styles.fullWidthMap

  const mapRef: React.RefObject<InteractiveMap> = useRef(null)
  const map: MbMap | undefined = mapRef.current?.getMap()

  function onLoad(mapLoadEvent: { target: MbMap }): void {
    const { target: mapObj } = mapLoadEvent

    // Maintain viewport state sync if needed (e.g. after `flyTo`), otherwise
    // the map shifts back to previous position after panning or zooming.
    mapObj.on('moveend', function onMoveEnd(zoomEndEvent: ZoomEndEvent): void {
      setMapIsMoving(false)

      if (zoomEndEvent.forceViewportUpdate) {
        const zoom = mapObj.getZoom()

        setViewport({
          ...viewport, // spreading just in case bearing or pitch are added
          latitude: mapObj.getCenter().lat,
          longitude: mapObj.getCenter().lng,
          pitch: mapObj.getPitch(),
          // Prevent empty map at global extent on small screens
          zoom: zoom < 0 ? 0 : zoom,
        })
      }
    })

    function onMoveStart(zoomEndEvent: ZoomEndEvent): void {
      if (zoomEndEvent.forceViewportUpdate) setMapIsMoving(true)
    }

    mapObj.on('movestart', onMoveStart)

    setMapLoaded(true)
  }

  useEffect(() => {
    if (!map || !mapLoaded) return

    zoomToMarkersExtent(map, preppedMarkerData)
  }, [preppedMarkerData, map, mapLoaded])

  return (
    <div
      style={{ height: 'max(285px, 22vh)' }}
      className={`${styles.mapRoot} ${rootClasses}`}
    >
      <ReactMapGL
        {...viewport}
        {...mapConfig}
        ref={mapRef}
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
