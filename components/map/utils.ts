import { LangLocation_Languagelocation, Language } from 'gql-ts/wp-graphql'

import { PreppedMarker } from './types'

export const getCitiesCoords = (
  languages: Language[]
): LangLocation_Languagelocation[] => {
  return languages?.map((node) => {
    const { langLocations, title: langName, uri } = node || {}
    const { nodes } = langLocations || {}

    if (!nodes?.length) return { city: 'alpena', lat: 45, lon: -79 }

    // TODO: reduce to get all of them
    return {
      ...(nodes[0]?.languageLocation || {}),
      langName,
      langUri: uri,
    }
  }) as PreppedMarker[]
}
