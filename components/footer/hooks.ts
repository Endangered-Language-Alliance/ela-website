import { useQuery } from 'react-query'
import { request } from 'graphql-request'

import { Page, GeneralSettings } from '../../wp-graphql'
import footerQuery from './FooterQuery.graphql'

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL as string

type FooterResponse = { nodeByUri: Page; generalSettings: GeneralSettings }
type UseQuery = {
  data?: FooterResponse
  error: Error | null
  isLoading: boolean
}
type UseFooterQuery = () => UseQuery

export const useFooterQuery: UseFooterQuery = () => {
  const { data, error, isLoading } = useQuery<FooterResponse, Error>(
    'footer',
    async () => {
      const footerData = await request(API_URL, footerQuery)

      return footerData
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
