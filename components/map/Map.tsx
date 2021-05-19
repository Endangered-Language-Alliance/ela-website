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
  const { preppedData, excludePopupLinkBtn } = props
  const [viewport, setViewport] = useState<ViewportState>(initialState)
  const [popupInfo, setPopupInfo] = useState<PopupState>(null)
  const [mapIsMoving, setMapIsMoving] = useState<boolean>(true)

  function onLoad(mapLoadEvent: { target: MbMap }): void {
    const { target: map } = mapLoadEvent

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

    // Avoid crazy zoom if only one marker
    if (preppedData.length === 1) {
      map.easeTo(
        {
          center: [preppedData[0]?.lon || 0, preppedData[0]?.lat || 0],
          zoom: 4,
        },
        { forceViewportUpdate: true }
      )

      return
    }

    const bounds = new LngLatBounds()

    preppedData.forEach(({ lon, lat }) => {
      if (lon && lat) bounds.extend([lon, lat])
    })

    map.fitBounds(bounds, { padding: 45 }, { forceViewportUpdate: true })
  }

  return (
    <ReactMapGL
      {...viewport}
      {...mapConfig}
      onViewportChange={setViewport}
      onLoad={onLoad}
      className={styles.map}
    >
      {!mapIsMoving && (
        <MapMarkers
          markers={preppedData || ([] as PreppedMarker[])}
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
      <FullscreenControl className={styles.mapCtrlBtnStyle} />
      <NavigationControl className={styles.mapCtrlBtnStyle} />
    </ReactMapGL>
  )
}
