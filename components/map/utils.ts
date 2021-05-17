import { Language } from 'gql-ts/wp-graphql'

import { PreppedMarker } from './types'

export const getCitiesCoords = (languages: Language[]): PreppedMarker[] => {
  const allOfEm = languages.reduce((all, thisOne): PreppedMarker[] => {
    const { langLocations, title: langName, uri } = thisOne || {}
    const { nodes } = langLocations || {}

    if (!nodes?.length) return all

    const locsMapped = nodes?.map((node) => {
      return {
        ...(node?.languageLocation || {}),
        langName,
        langUri: uri,
      }
    })

    // TODO: reduce to get all of them
    return [...all, ...locsMapped] as PreppedMarker[]
  }, [] as PreppedMarker[])

  return allOfEm
}
