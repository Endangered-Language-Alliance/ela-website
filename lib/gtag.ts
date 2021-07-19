import type { NextWebVitalsMetric } from 'next/app'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { gaTrackingID } = publicRuntimeConfig

type GtagEventParams = {
  action: string
  category?: string
  label?: string
  value?: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', gaTrackingID, {
    page_path: url,
  })
}

// TODO: rm if not using
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (e: GtagEventParams): void => {
  const { action, category, label, value } = e

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

// TODO: remove if not using
export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const { id, name, label, value } = metric // values must be integers

  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://bit.ly/3rmzWSa
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}
