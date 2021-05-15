import { useQuery } from 'react-query'
import { request } from 'graphql-request'

import MainMenuQuery from './HeaderQuery.graphql'
import { HeaderResponse, UseHeaderQuery } from './types'

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL as string

export const useHeaderQuery: UseHeaderQuery = () => {
  const { data, error, isLoading } = useQuery<HeaderResponse, Error>(
    'main-menu',
    async () => {
      const mainMenuResp = await request(API_URL, MainMenuQuery)

      return mainMenuResp
    }
  )

  return { data, error, isLoading }
}
