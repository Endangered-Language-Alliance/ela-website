export const convertBreadcrumb = (text: string): string =>
  text
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .replace(/\?.*/, '')
