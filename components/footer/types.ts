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
