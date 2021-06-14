import * as React from 'react'
import { Marker } from 'react-map-gl'

import { MapMarkersProps, MarkerIconProps, ClickableMarkerProps } from './types'

import styles from './Map.module.css'
import { MARKER_SVG_PATH } from './config'

/**
 * Pin marker that can be used anywhere, not just the map
 * @param props Marker color and label
 * @returns 24x24 SVG pin icon and absolutely-positioned label
 */
export const MarkerIcon: React.FC<MarkerIconProps> = (props) => {
  const { color, label } = props

  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className={styles.markerIcon}
        fill={color || 'gray'}
      >
        <path d={MARKER_SVG_PATH} />
      </svg>
      <div className={styles.markerLabel}>{label}</div>
    </>
  )
}

const ClickableMarker: React.FC<ClickableMarkerProps> = (props) => {
  const { tabIndex, children, title, linkText } = props
  const { onClick, lat, lon, subtitle, uri } = props

  const interact = (): void => {
    onClick({
      uri,
      title,
      linkText: `View ${linkText || ''}`,
      subtitle: subtitle || '',
      lat: lat || 0,
      lon: lon || 0,
    })
  }

  return (
    <a
      tabIndex={tabIndex}
      role="button"
      style={{ cursor: 'pointer' }}
      className={styles.marker}
      onClick={interact}
      onKeyDown={interact}
    >
      {children}
    </a>
  )
}

// Important for perf (???): the markers never change, avoid rerender when the
// map viewport changes
function MapMarkers(props: MapMarkersProps): React.ReactNode {
  const { markers, onClick } = props

  return markers.map((marker, i) => {
    const { lat, lon, color, label } = marker

    return (
      <Marker
        key={(lat as number) + (lon as number)}
        longitude={lon || 0}
        latitude={lat || 0}
      >
        <ClickableMarker onClick={onClick} {...marker} tabIndex={i}>
          <MarkerIcon label={label} color={color} />
        </ClickableMarker>
      </Marker>
    )
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default React.memo(MapMarkers)
