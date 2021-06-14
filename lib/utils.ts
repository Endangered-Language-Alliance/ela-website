import { ChipProps } from 'components/buttons/types'

// CRED: https://stackoverflow.com/a/18648314/1048518
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.toLocaleString('default', { month: 'long' })

  return `${month} ${date.getDate()}, ${date.getFullYear()}`
}

// CRED: https://stackoverflow.com/a/55776744/1048518
export const intRange = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export const prepRecentYearChips = (): ChipProps[] => {
  const currentYear = new Date().getFullYear()
  const spanOfYears = currentYear - 2010 // oldest post year

  return intRange(currentYear, currentYear - spanOfYears, -1).map(
    (postYear) => ({
      uri: `/latest/${postYear}`,
      text: postYear?.toString() || '',
    })
  )
}

// CRED: NYC Langs
type Compare<T> = (a: T, b: T) => number

export const sortArrOfObjects = <T>(key: keyof T): Compare<T> => {
  return (a: T, b: T): number => {
    let comparison = 0

    if (a[key] > b[key]) comparison = 1
    else if (a[key] < b[key]) comparison = -1

    return comparison
  }
}
