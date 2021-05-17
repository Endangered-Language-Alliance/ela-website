import Link from 'next/link'
import { Popup } from 'react-map-gl'

import btnStyles from 'components/buttons/Button.module.css'
import styles from './Map.module.css'
import { PopupState } from './types'

export type MapPopupProps = {
  popupInfo: PopupState
  setPopupInfo: React.Dispatch<PopupState>
}

export const MapPopup: React.FC<MapPopupProps> = (props) => {
  const { popupInfo, setPopupInfo } = props

  if (!popupInfo) return null // ughhh already know it's not null

  const { lat, lon, heading, subtitle, linkUri, linkText } = popupInfo

  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={lon}
      latitude={lat}
      closeOnClick={false}
      onClose={setPopupInfo}
    >
      <h3 className={styles.popupHeading}>{heading}</h3>
      {/* CRED: https://css-tricks.com/html-for-subheadings-and-headings/ */}
      <div role="doc-subtitle" className={styles.popupSubtitle}>
        {subtitle}
      </div>
      {linkUri && (
        <Link href={linkUri}>
          <a
            className={`${btnStyles.button} ${btnStyles.primary} ${btnStyles.contentOnly} ${btnStyles.small}`}
          >
            {linkText}
          </a>
        </Link>
      )}
    </Popup>
  )
}