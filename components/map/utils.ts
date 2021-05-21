import {
  ContinentColors,
  ContinentGroup,
  LangWithKnownContinent,
} from 'components/languages/types'
import { PreppedMarker } from './types'

const continentColors = {
  Africa: 'hsl(302, 47%, 37%)',
  Americas: 'hsl(219, 48%, 46%)',
  Asia: 'hsl(16, 65%, 50%)',
  Europe: 'hsl(128, 36%, 29%)',
} as ContinentColors

export const getIconColorByContinent = (
  continent?: null | keyof typeof continentColors
): string => {
  return continent ? continentColors[continent] || 'gray' : 'gray'
}

export const getCitiesCoords = (
  languages: LangWithKnownContinent[]
): PreppedMarker[] => {
  const allOfEm = languages.reduce((all, thisOne): PreppedMarker[] => {
    const { langLocations, title, uri } = thisOne || {}
    const { nodes } = langLocations || {}

    if (!nodes?.length) return all

    const locsMapped = nodes?.map((node) => {
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

export const getContinentGroups = (
  languages: LangWithKnownContinent[]
): ContinentGroup => {
  return languages.reduce(
    (all: ContinentGroup, thisOne: LangWithKnownContinent) => {
      const { langLocations } = thisOne
      const { nodes } = langLocations
      const firstOne = nodes[0]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { languageLocation } = firstOne || {}
      const { continent } = languageLocation || {}

      if (!continent) return all

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!all[continent]) {
        return {
          ...all,
          [continent]: [thisOne],
        }
      }

      return {
        ...all,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [continent]: [...all[continent], thisOne],
      }
    },
    {} as ContinentGroup
  )
}
