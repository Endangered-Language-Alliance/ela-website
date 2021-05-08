import { Page, GeneralSettings, MenuItem } from '../../wp-graphql'

export type FooterResponse = {
  nodeByUri: Page
  generalSettings: GeneralSettings
  menuItems: {
    nodes: MenuItem[]
  }
}

export type UseQuery = {
  data?: FooterResponse
  error: Error | null
  isLoading: boolean
}

export type UseFooterQuery = () => UseQuery

export type ContactInfoProps = {
  address?: string | null
  email?: string | null
  phone?: string | null
}

export type TheFinalWordProps = {
  sourceUrl?: string | null
  title?: string | null
}

export type SocialIconsProps = {
  archiveOrg?: string | null
  facebook?: string | null
  instagram?: string | null
  youTube?: string | null
}
