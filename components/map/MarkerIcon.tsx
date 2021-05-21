import React, { FC } from 'react'

import styles from './Map.module.css'
import { MARKER_SVG_PATH } from './config'
import { MarkerIconProps, ClickableMarkerIconProps } from './types'

export const MarkerIcon: FC<MarkerIconProps> = (props) => {
  const { iconColor, city } = props

  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className={styles.markerIcon}
        fill={iconColor || 'gray'}
      >
        <path d={MARKER_SVG_PATH} />
      </svg>
      <div className={styles.markerLabel}>{city?.slice(0, 2)}</div>
    </>
  )
}

export const ClickableMarkerIcon: FC<ClickableMarkerIconProps> = (props) => {
  const { city, iconColor } = props // bare min for non-clickable
  const { onClick, lat, lon, country, uri, tabIndex } = props

  const interact = (): void => {
    onClick({
      uri,
      title: city || '',
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
      <MarkerIcon city={city} iconColor={iconColor} />
    </a>
  )
}
