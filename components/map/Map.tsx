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
  const { preppedMarkerData = [], excludePopupLinkBtn } = props
  const [viewport, setViewport] = useState<ViewportState>(initialState)
  const [popupInfo, setPopupInfo] = useState<PopupState | null>(null)
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

    try {
      // TODO: make it work for 320px and under
      map.fitBounds(
        bounds,
        { padding: 25, center: bounds.getCenter() },
        { forceViewportUpdate: true }
      )
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.fullWidthMap}>
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
        <FullscreenControl className={styles.mapCtrlBtnStyle} />
        <NavigationControl className={styles.mapCtrlBtnStyle} />
      </ReactMapGL>
    </div>
  )
}
