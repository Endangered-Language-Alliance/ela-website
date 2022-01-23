import { Product } from 'gql-ts/wp-graphql'
import { request } from 'graphql-request'
import allProducts from 'lib/gql-queries/store/AllProducts.graphql'
import productById from 'lib/gql-queries/store/ProductById.graphql'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { wpGqlEndpoint } = publicRuntimeConfig

export async function getAllProducts(): Promise<Product[]> {
  const data = await request<Product[]>(wpGqlEndpoint, allProducts)

  return data
}

// TODO: rm if not using
export const getProduct = async (id: string | string[]): Promise<Product> => {
  const data = await request<Product>(wpGqlEndpoint, productById, { id })

  return data
}
