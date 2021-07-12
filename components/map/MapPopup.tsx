import Link from 'next/link'
import { Popup } from 'react-map-gl'

import btnStyles from 'components/buttons/Button.module.css'
import styles from './Map.module.css'
import { MapPopupProps } from './types'

export const MapPopup: React.FC<MapPopupProps> = (props) => {
  const { popupInfo, setPopupInfo, excludePopupLinkBtn } = props
  const { button, secondary, small } = btnStyles

  if (!popupInfo) return null // ughhh already know it's not null

  const { lat, lon, title, subtitle, uri, linkText } = popupInfo

  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={lon}
      latitude={lat}
      closeOnClick={false}
      onClose={setPopupInfo}
      className={styles.popupRoot}
    >
      <div className={styles.popupContent}>
        <header>
          <h3 className={styles.popupHeading}>{title}</h3>
          {/* CRED: https://css-tricks.com/html-for-subheadings-and-headings/ */}
          {subtitle && (
            <div role="doc-subtitle" className={styles.popupSubtitle}>
              {subtitle}
            </div>
          )}
        </header>
        {!excludePopupLinkBtn && uri && (
          <Link href={uri}>
            <a
              className={`${button} ${secondary} ${small}`}
              style={{ float: 'right', marginTop: 'var(--p1)' }}
            >
              {linkText}
            </a>
          </Link>
        )}
      </div>
    </Popup>
  )
}
