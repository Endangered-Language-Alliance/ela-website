import * as React from 'react'
import { Marker } from 'react-map-gl'

import { ClickableMarker, MarkerIcon } from './MarkerIcon'
import { PreppedMarker, MapMarkersProps } from './types'

// Important for perf (???): the markers never change, avoid rerender when the
// map viewport changes
function MapMarkers(props: MapMarkersProps): React.ReactNode | null {
  const { markers, onClick } = props

  return markers.map((marker, i) => {
    const { lat, lon, city, iconColor, markerLabel } = marker as PreppedMarker

    return (
      <Marker key={`marker-${city}`} longitude={lon || 0} latitude={lat || 0}>
        <ClickableMarker onClick={onClick} {...marker} tabIndex={i}>
          <MarkerIcon markerLabel={markerLabel} iconColor={iconColor} />
        </ClickableMarker>
      </Marker>
    )
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default React.memo(MapMarkers)
