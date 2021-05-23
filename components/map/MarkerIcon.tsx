import React, { FC } from 'react'

import styles from './Map.module.css'
import { MARKER_SVG_PATH } from './config'
import { MarkerIconProps, ClickableMarkerProps } from './types'

export const MarkerIcon: FC<MarkerIconProps> = (props) => {
  const { iconColor, markerLabel } = props

  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className={styles.markerIcon}
        fill={iconColor || 'gray'}
      >
        <path d={MARKER_SVG_PATH} />
      </svg>
      <div className={styles.markerLabel}>{markerLabel}</div>
    </>
  )
}

export const ClickableMarker: FC<ClickableMarkerProps> = (props) => {
  const { tabIndex, city, children, title } = props
  const { onClick, lat, lon, country, uri } = props
  const interact = (): void => {
    onClick({
      uri,
      title: city || '',
      linkText: `View ${title || ''}`,
      subtitle: country || '',
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
