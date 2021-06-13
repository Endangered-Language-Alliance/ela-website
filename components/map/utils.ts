import {
  ContinentColors,
  Continent,
  LangWithKnownContinent,
  GroupConfig,
  GroupConfigItem,
} from 'components/languages/types'
import { Language, Project } from 'gql-ts/wp-graphql'
import { MarkerIconProps, MapMarker } from './types'

const continentColors = {
  Africa: 'hsl(302, 47%, 37%)',
  Americas: 'hsl(219, 48%, 46%)',
  Asia: 'hsl(16, 65%, 50%)',
  Europe: 'hsl(128, 36%, 29%)',
} as ContinentColors

const getColorByContinent = (continent: Continent): string =>
  continentColors[continent] || 'gray'

// TODO: 1) improve logic, 2) don't have a million arguments
/**
 * Prepare map markers with city/country/etc. info
 * @param languages Languages (with a known continent)
 * @param omitMarkerLabel Don't show any value in the markers
 * @param usePlainColor Use a simple gray marker fill
 * @param markerColor Total color override, e.g. projects instance
 * @returns Array of map markers with optional colors and labels
 */
export const prepCitiesMarkers = (
  languages: LangWithKnownContinent[], // wrong TS for projects landing...
  omitMarkerLabel?: boolean,
  usePlainColor?: boolean,
  markerColor?: string
): MapMarker[] => {
  const locsCounts = {} as { [key in Continent]: number }

  const allOfEm = languages.reduce((all, thisOne): MapMarker[] => {
    const { langLocations, uri, title } = thisOne || {}
    const { nodes } = langLocations || {}

    if (!nodes?.length) return all

    const locsMapped = nodes?.map(
      (node): MapMarker => {
        const { languageLocation } = node
        const { continent, lat, lon, city, country } = languageLocation

        if (locsCounts[continent]) {
          locsCounts[continent] += 1
        } else {
          locsCounts[continent] = 1
        }

        let label: string | number = ''
        let color = 'var(--gr7)'

        if (!omitMarkerLabel) label = locsCounts[continent]

        if (markerColor) color = markerColor
        else if (!usePlainColor) {
          color = getColorByContinent(continent || 'Africa')
        }

        const marker = { lat: lat || 0, lon: lon || 0, color, label }
        const popup = {
          title: title || '',
          subtitle: `${city}, ${country}`,
          uri,
          linkText: 'Language',
        }

        return { ...marker, ...popup }
      }
    )

    return [...all, ...locsMapped] as MapMarker[] // TODO: reduce to get all
  }, [] as MapMarker[])

  return allOfEm
}

const continents: Continent[] = ['Africa', 'Americas', 'Asia', 'Europe']

export const prepContinentGroups = (
  languages: LangWithKnownContinent[]
): GroupConfig[] => {
  return continents.map((name) => {
    let locsCount = 0
    const color = getColorByContinent(name)

    const corresponding = languages.filter((language) => {
      const firstOne = language.langLocations.nodes[0]

      return firstOne?.languageLocation.continent === name
    })

    function getItems(language: LangWithKnownContinent): GroupConfigItem {
      const { uri, title, customInfo, langLocations } = language
      const { endonym } = customInfo || {}

      const markers = langLocations.nodes.map(
        (): MarkerIconProps => {
          locsCount += 1

          return { color, label: locsCount }
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
              (): MarkerIconProps => {
                locsCount += 1

                return { color, label: locsCount }
              }
            ) || ([] as MarkerIconProps[])

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

export const prepProjectsMarkers = (
  languages: Language[],
  projects: Project[],
  plainAndSimple?: boolean
): MapMarker[] => {
  const locsCounts = {} as { [key: string]: number }
  const colors = {} as { [key: string]: string }

  const allOfEm = languages.reduce((all, thisOne): MapMarker[] => {
    const { langLocations, customInfo, title: langTitle } = thisOne || {}
    const { nodes } = langLocations || {}

    if (!nodes?.length) return all

    const { project } = customInfo || {}
    const { title: projectTitle, uri: projUri } =
      (project as { title: keyof typeof locsCounts; uri: string }) ||
      ({} as { title: keyof typeof locsCounts; uri: string })

    const locsMapped = nodes?.map(
      (node): MapMarker => {
        const { languageLocation } = node || {}
        const { lat, lon, city, country } = languageLocation || {}

        if (locsCounts[projectTitle]) locsCounts[projectTitle] += 1
        else locsCounts[projectTitle] = 1

        let label: string | number = ''
        let color = 'var(--gr7)'

        if (!plainAndSimple) {
          label = locsCounts[projectTitle]

          if (colors[projectTitle]) color = colors[projectTitle]
          else {
            color =
              projects.find(
                ({ title: projTitle }) => projTitle === projectTitle
              )?.projectMeta?.iconColor || color

            colors[projectTitle] = color // cache the result
          }
        }

        const marker = { lat: lat || 0, lon: lon || 0, color, label }

        const popup = {
          title: (projectTitle as string) || '',
          subtitle: `Selected: ${langTitle} (${city}, ${country})`,
          uri: projUri,
          linkText: 'Project',
        }

        return { ...marker, ...popup }
      }
    )

    return [...all, ...locsMapped] as MapMarker[] // TODO: reduce to get all
  }, [] as MapMarker[])

  return allOfEm
}
