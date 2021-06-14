import getConfig from 'next/config'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'

import footerQuery from './FooterQuery.graphql'
import { FooterResponse, UseFooterQuery } from './types'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

export const useFooterQuery: UseFooterQuery = () => {
  const { data, error, isLoading } = useQuery<FooterResponse, Error>(
    'footer',
    async () => {
      const footerData = await request(wpGqlEndpoint, footerQuery)

      return footerData
    }
  )

  return { data, error, isLoading }
}
