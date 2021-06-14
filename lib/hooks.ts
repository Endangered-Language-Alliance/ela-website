import { useRef, useState, useCallback, useEffect } from 'react'

// CRED: for much of this challenging scroll stuff!
// https://stackoverflow.com/questions/36207398
// https://github.com/mui-org/material-ui/issues/12337#issuecomment-487200865

function getScrollY(scroller: HTMLElement | null): number {
  if (!scroller) return window.pageYOffset
  if (scroller.scrollTop !== undefined) return scroller.scrollTop

  return (document.documentElement || document.body.parentNode || document.body)
    .scrollTop
}

export const useHideOnScroll = (
  refElem: React.RefObject<HTMLDivElement | null>,
  threshold = 100 // prevents mobile weirdness on things like Census dropdown
): boolean => {
  const scrollRef = useRef<number>(0)
  const [hide, setHide] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollY = getScrollY(refElem.current)
    scrollRef.current = scrollY

    setHide(scrollY > threshold)
  }, [refElem, threshold])

  useEffect(() => {
    if (!refElem) return

    refElem.current?.addEventListener('scroll', handleScroll)

    // TODO: just warnings, but resolve both of these if possible
    // eslint-disable-next-line consistent-return
    return function cleanup() {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refElem.current?.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, refElem, threshold])

  return hide
}
