import { ChipProps } from 'components/buttons/types'
import { LangInstanceLinksListProps } from './types'

const KRATYLOS_BASE_URL = [
  'https://kratylos.org/~kratylos/project.cgi?',
  'institution=ELA&language=',
].join('')

export const prepLangInstanceChips = (
  data: LangInstanceLinksListProps
): ChipProps[] => {
  const { project, external } = data
  const { archiveOrgLink, nycLangMap, kratylos } = external || {}

  const chips: ChipProps[] = []

  if (project) {
    chips.push({
      text: project.title || '',
      uri: project.uri || '/projects',
    })
  }

  if (archiveOrgLink) {
    chips.push({
      text: 'Archive.org',
      uri: archiveOrgLink,
      external: true,
    })
  }

  if (nycLangMap) {
    chips.push({
      text: 'NYC Map',
      uri: nycLangMap,
      external: true,
    })
  }

  if (kratylos) {
    chips.push({
      text: 'Kratylos',
      uri: KRATYLOS_BASE_URL + kratylos,
      external: true,
    })
  }

  return chips
}
