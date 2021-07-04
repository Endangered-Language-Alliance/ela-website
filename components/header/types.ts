import { MenuItem, Page_Sitewidesettings } from 'gql-ts/wp-graphql'

export type HeaderResponse = {
  menuItems: {
    nodes: MenuItem[]
  }
  siteWideStuff: {
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
  isOpen: boolean
  setIsOpen: React.Dispatch<boolean>
}

export type CtaButtonProps = {
  url?: null | string
  text?: null | string
}
