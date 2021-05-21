import { ViewportProps } from 'react-map-gl'
import { LangLocation_Languagelocation } from 'gql-ts/wp-graphql'

export type PreppedMarker = LangLocation_Languagelocation & {
  title: string
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
