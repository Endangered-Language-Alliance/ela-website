// CRED: https://stackoverflow.com/a/18648314/1048518
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.toLocaleString('default', { month: 'long' })

  return `${month} ${date.getDate()}, ${date.getFullYear()}`
}

// CRED: https://stackoverflow.com/a/55776744/1048518
export const intRange = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
