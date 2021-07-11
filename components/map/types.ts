import { ViewportProps } from 'react-map-gl'

import { KnownLangLocation } from 'components/languages/types'

export type PreppedMarker = KnownLangLocation &
  MarkerIconProps & {
    uri: string
  }

export type ViewportState = Partial<ViewportProps>

export type PopupState = {
  lat: number
  lon: number
  title: string
  subtitle?: string // e.g. country name
  uri?: string
  linkText?: string
}

export type MapMarker = MarkerIconProps & PopupState

export type MapMarkersProps = {
  markers: MapMarker[]
  onClick: React.Dispatch<PopupState | null>
}

export type MarkerIconProps = {
  color?: string
  label?: string | number
}

export type ClickableMarkerProps = PopupState & {
  tabIndex: number
  onClick: React.Dispatch<PopupState | null>
}

// Custom data at end of MB event, e.g. moveend
export type ZoomEndEvent = {
  forceViewportUpdate?: boolean
}

type PopupOverrides = {
  excludePopupLinkBtn?: boolean
}

export type MapProps = PopupOverrides & {
  noNegativeMargin?: boolean
  preppedMarkerData: MapMarker[]
}

export type MapPopupProps = PopupOverrides & {
  popupInfo: PopupState
  setPopupInfo: React.Dispatch<PopupState | null>
  excludePopupLinkBtn?: boolean // avoid self-linking buttons on Lang instance
}
