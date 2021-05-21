import React, { FC } from 'react'

import styles from './Map.module.css'
import { MARKER_SVG_PATH } from './config'
import { PreppedMarker, PopupState } from './types'

export type MarkerIconProps = PreppedMarker & {
  onClick?: React.Dispatch<PopupState>
  tabIndex: number
}

export const MarkerIcon: FC<MarkerIconProps> = (props) => {
  const { iconColor, onClick, lat, lon, country, city, uri, tabIndex } = props

  const Icon = (
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

  if (onClick) {
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
        {Icon}
      </a>
    )
  }

  return Icon
}
