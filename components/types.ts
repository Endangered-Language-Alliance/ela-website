import { Page } from 'gql-ts/wp-graphql'
import { ChipProps } from 'components/buttons/types'

type ChipsItems = {
  chipsItems?: ChipProps[]
}

export type LayoutProps = {
  noContentWrap?: boolean
  tweenerContent?: React.ReactNode
  youTubePlaylistId?: string | null
  titleTitle?: string // <title> content
  childPages?: Page[] | null
} & HeroProps &
  ChipsItems

export type HeroProps = {
  title?: string | null
  subtitle?: string | null // e.g. endonym
  summary?: string | null // e.g. excerpt
} & ChipsItems
