import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'

interface IUseObserver {
  (options?: IntersectionObserverInit): [boolean, RefObject<HTMLElement>]
}

export const useObserver: IUseObserver = (options) => {
  const [isInView, setIsInView] = useState(false)
  const entryRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    if (entryRef.current) {
      observer.observe(entryRef.current)
    }

    return () => {
      if (entryRef.current) {
        observer.unobserve(entryRef.current)
      }
    }
  }, [options, entryRef])

  return [isInView, entryRef]
}
