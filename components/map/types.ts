import { ViewportProps } from 'react-map-gl'

import { KnownLangLocation } from 'components/languages/types'

export type PreppedMarker = KnownLangLocation & {
  uri: string
  iconColor?: string
}

export type ViewportState = Partial<ViewportProps>

export type PopupState = {
  lat: number
  lon: number
  title: string
  subtitle?: string // e.g. country name
  uri?: string
  linkText?: string
} | null

export type MapMarkersProps = {
  markers: PreppedMarker[]
  onClick: React.Dispatch<PopupState>
}

export type MarkerIconProps = Pick<PreppedMarker, 'iconColor' | 'city'>

export type ClickableMarkerIconProps = PreppedMarker & {
  tabIndex: number
  onClick: React.Dispatch<PopupState>
}

// Custom data at end of MB event, e.g. moveend
export type ZoomEndEvent = {
  forceViewportUpdate?: boolean
}

type PopupOverrides = {
  excludePopupLinkBtn?: boolean
}

export type MapProps = PopupOverrides & {
  preppedData: PreppedMarker[]
}

export type MapPopupProps = PopupOverrides & {
  popupInfo: PopupState
  setPopupInfo: React.Dispatch<PopupState>
  excludePopupLinkBtn?: boolean // avoid self-linking buttons on Lang instance
}
