import { useState } from 'react'
import { LngLatBounds, Map as MbMap } from 'mapbox-gl'
import ReactMapGL, { NavigationControl, FullscreenControl } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import MapMarkers from './MapMarkers'
import { MapPopup } from './MapPopup'
import { mapConfig, initialState, mapCtrlBtnStyle } from './config'
import { PreppedMarker, ViewportState, PopupState, ZoomEndEvent } from './types'

export const Map: React.FC<{ preppedData: PreppedMarker[] }> = (props) => {
  const { preppedData } = props
  const [viewport, setViewport] = useState<ViewportState>(initialState)
  const [popupInfo, setPopupInfo] = useState<PopupState>(null)
  const [mapIsMoving, setMapIsMoving] = useState<boolean>(true)

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
  )
}
