import { ChipProps } from 'components/buttons/types'
import { LangInstanceLinksListProps } from './types'

export const prepLangInstanceChips = (
  data: LangInstanceLinksListProps
): ChipProps[] => {
  const { project, external } = data
  const { archiveOrgLink, nycLangMap } = external || {}

  const chips: ChipProps[] = []

  if (project) {
    chips.push({
      text: `Project: ${project.title}`,
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
      text: 'Languages of NYC Map',
      uri: nycLangMap,
      external: true,
    })
  }

  return chips
}
