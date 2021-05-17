import { ViewportProps } from 'react-map-gl'
import { LangLocation_Languagelocation } from 'gql-ts/wp-graphql'

export type PreppedMarker = LangLocation_Languagelocation & {
  langName: string
  langUri: string
}

export type ViewportState = Partial<ViewportProps>

export type PopupState = {
  lat: number
  lon: number
  heading: string
  subtitle?: string // e.g. country name
  linkUri?: string
  linkText?: string
} | null

export type MapMarkersProps = {
  markers: LangLocation_Languagelocation[]
  onClick: React.Dispatch<PopupState>
}

// Custom data at end of MB event, e.g. moveend
export type ZoomEndEvent = {
  forceViewportUpdate?: boolean
}
