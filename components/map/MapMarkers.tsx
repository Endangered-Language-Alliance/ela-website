import * as React from 'react'
import { Marker } from 'react-map-gl'

import styles from './Map.module.css'
import { PreppedMarker, MapMarkersProps } from './types'
import { MARKER_SVG_PATH } from './config'

// Important for perf: the markers never change, avoid rerender when the map
// viewport changes
function MapMarkers(props: MapMarkersProps): React.ReactNode | null {
  const { markers, onClick } = props

  return markers.map((marker) => {
    const {
      city,
      lat,
      lon,
      country,
      langName,
      langUri,
    } = marker as PreppedMarker

    return (
      <Marker key={`marker-${city}`} longitude={lon || 0} latitude={lat || 0}>
        <svg
          viewBox="0 0 24 24"
          className={styles.marker}
          onClick={() => {
            onClick({
              linkUri: langUri,
              linkText: langName,
              heading: city || '',
              subtitle: country || '',
              lat: lat || 0,
              lon: lon || 0,
            })
          }}
        >
          <path d={MARKER_SVG_PATH} />
        </svg>
      </Marker>
    )
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default React.memo(MapMarkers)
