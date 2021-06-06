import {
  ContinentColors,
  Continent,
  LangWithKnownContinent,
  GroupConfig,
  GroupConfigItem,
} from 'components/languages/types'
import { Language, Project } from 'gql-ts/wp-graphql'
import { MarkerIconReqd, PreppedMarker } from './types'

const continentColors = {
  Africa: 'hsl(302, 47%, 37%)',
  Americas: 'hsl(219, 48%, 46%)',
  Asia: 'hsl(16, 65%, 50%)',
  Europe: 'hsl(128, 36%, 29%)',
} as ContinentColors

export const getIconColorByContinent = (continent: Continent): string => {
  return continentColors[continent] || 'gray'
}

export const getCitiesCoords = (
  languages: LangWithKnownContinent[],
  plainAndSimple?: boolean
): PreppedMarker[] => {
  const locsCounts = {} as { [key in Continent]: number }

  const allOfEm = languages.reduce((all, thisOne): PreppedMarker[] => {
    const { langLocations, title, uri } = thisOne || {}
    const { nodes } = langLocations || {}

    if (!nodes?.length) return all

    const locsMapped = nodes?.map((node) => {
      if (locsCounts[node.languageLocation.continent]) {
        locsCounts[node.languageLocation.continent] += 1
      } else {
        locsCounts[node.languageLocation.continent] = 1
      }

      /* eslint-disable operator-linebreak */
      const markerLabel = plainAndSimple
        ? ''
        : locsCounts[node.languageLocation.continent]

      const iconColor = plainAndSimple
        ? 'var(--gr7)'
        : getIconColorByContinent(node?.languageLocation?.continent || 'Africa')
      /* eslint-enable operator-linebreak */

      return {
        ...(node?.languageLocation || {}),
        title,
        uri,
        markerLabel,
        iconColor,
      }
    })

    // TODO: reduce to get all of them
    return [...all, ...locsMapped] as PreppedMarker[]
  }, [] as PreppedMarker[])

  return allOfEm
}

const continents: Continent[] = ['Africa', 'Americas', 'Asia', 'Europe']

export const prepContinentGroups = (
  languages: LangWithKnownContinent[]
): GroupConfig[] => {
  return continents.map((name) => {
    let locsCount = 0
    const color = getIconColorByContinent(name)

    const corresponding = languages.filter((language) => {
      const firstOne = language.langLocations.nodes[0]

      return firstOne?.languageLocation.continent === name
    })

    function getItems(language: LangWithKnownContinent): GroupConfigItem {
      const { uri, title, customInfo, langLocations } = language
      const { endonym } = customInfo || {}

      const markers = langLocations.nodes.map(
        (): MarkerIconReqd => {
          locsCount += 1

          return { iconColor: color, markerLabel: locsCount }
        }
      )

      return {
        title: title || '',
        subtitle: endonym || '',
        href: uri,
        markers,
      }
    }

    const items = corresponding.map(getItems)

    return { name, color, items }
  })
}

export const prepProjectsGroups = (
  projects: Project[],
  languages: Language[]
): GroupConfig[] => {
  return projects.map(({ title: projectTitle, uri, projectMeta }) => {
    let locsCount = 0

    const childLangs = languages.filter(
      (language) => language.customInfo?.project?.uri === uri
    )
    const color = projectMeta?.iconColor || ''

    return {
      name: projectTitle?.replace(' Languages', '') || '',
      href: uri || '',
      color,
      items: childLangs.map(
        ({ title, langLocations, customInfo }): GroupConfigItem => {
          const markers =
            langLocations?.nodes?.map(
              (): MarkerIconReqd => {
                locsCount += 1

                return { iconColor: color, markerLabel: locsCount }
              }
            ) || ([] as MarkerIconReqd[])

          return {
            title: title || '',
            subtitle: customInfo?.endonym || title || '',
            href: uri,
            markers,
          }
        }
      ),
    }
  })
}
