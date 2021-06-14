import getConfig from 'next/config'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'

import MainMenuQuery from './HeaderQuery.graphql'
import { HeaderResponse, UseHeaderQuery } from './types'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

export const useHeaderQuery: UseHeaderQuery = () => {
  const { data, error, isLoading } = useQuery<HeaderResponse, Error>(
    'main-menu',
    async () => {
      const mainMenuResp = await request(wpGqlEndpoint, MainMenuQuery)

      return mainMenuResp
    }
  )

  return { data, error, isLoading }
}
