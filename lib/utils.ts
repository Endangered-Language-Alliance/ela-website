// CRED: https://stackoverflow.com/a/18648314/1048518
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.toLocaleString('default', { month: 'long' })

  return `${month} ${date.getDate()}, ${date.getFullYear()}`
}

// CRED: https://stackoverflow.com/a/55776744/1048518
export const intRange = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export const slugToTitleCase = (slug: string): string => {
  // CRED: https://stackoverflow.com/a/8980917/1048518
  const words = slug.split('-')

  for (let i = 0; i < words.length; i + 1) {
    const word = words[i]

    words[i] = word.charAt(0).toUpperCase() + word.slice(1)
  }

  return words.join(' ')
}
