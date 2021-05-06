import { MenuItem } from '../../wp-graphql'

export type HeaderResponse = {
  menuItems: {
    nodes: MenuItem[]
  }
}

export type UseQuery = {
  data?: HeaderResponse
  error: Error | null
  isLoading: boolean
}

export type UseHeaderQuery = () => UseQuery
