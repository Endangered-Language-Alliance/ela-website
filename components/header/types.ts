import { MenuItem, Page_Sitewidesettings } from 'gql-ts/wp-graphql'

export type HeaderResponse = {
  menuItems: {
    nodes: MenuItem[]
  }
  logo: {
    siteWideSettings: Page_Sitewidesettings
  }
}

export type UseQuery = {
  data?: HeaderResponse
  error: Error | null
  isLoading: boolean
}

export type UseHeaderQuery = () => UseQuery

export type BurgerProps = {
  id: string
}
