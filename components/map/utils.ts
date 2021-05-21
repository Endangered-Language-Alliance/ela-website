import { Language } from 'gql-ts/wp-graphql'

import { PreppedMarker } from './types'

const continentColors = {
  asia: 'hsl(16, 65%, 50%)',
  americas: 'hsl(219, 48%, 46%)',
  africa: 'hsl(302, 47%, 37%)',
  europe: 'hsl(128, 36%, 29%)',
}

export const getIconColorByContinent = (
  continent?: null | keyof typeof continentColors
): string => {
  return continent ? continentColors[continent] || 'gray' : 'gray'
}

export const getCitiesCoords = (languages: Language[]): PreppedMarker[] => {
  const allOfEm = languages.reduce((all, thisOne): PreppedMarker[] => {
    const { langLocations, title, uri } = thisOne || {}
    const { nodes } = langLocations || {}

    if (!nodes?.length) return all

    const locsMapped = nodes?.map((node) => {
      return {
        ...(node?.languageLocation || {}),
        title,
        uri,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        iconColor: getIconColorByContinent(node?.languageLocation?.continent),
      }
    })

    // TODO: reduce to get all of them
    return [...all, ...locsMapped] as PreppedMarker[]
  }, [] as PreppedMarker[])

  return allOfEm
}
