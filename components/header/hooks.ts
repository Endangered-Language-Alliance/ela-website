import { useQuery } from 'react-query'
import { request } from 'graphql-request'

import { Menu } from '../../wp-graphql'
import MainMenuQuery from './HeaderQuery.graphql'

type UseQuery = {
  data?: Menu
  error: Error | null
  isLoading: boolean
}
type UseHeaderQuery = () => UseQuery

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL as string

export const useHeaderQuery: UseHeaderQuery = () => {
  const { data, error, isLoading } = useQuery<Menu, Error>(
    'main-menu',
    async () => {
      const mainMenuResp = await request(API_URL, MainMenuQuery)

      return mainMenuResp
    },
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )

  return { data, error, isLoading }
}
