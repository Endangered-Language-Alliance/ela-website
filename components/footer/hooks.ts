import { useQuery } from 'react-query'
import { request } from 'graphql-request'

import footerQuery from './FooterQuery.graphql'
import { FooterResponse, UseFooterQuery } from './types'

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL as string

export const useFooterQuery: UseFooterQuery = () => {
  const { data, error, isLoading } = useQuery<FooterResponse, Error>(
    'footer',
    async () => {
      const footerData = await request(API_URL, footerQuery)

      return footerData
    }
  )

  return { data, error, isLoading }
}
