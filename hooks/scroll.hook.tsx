import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

interface IUseScroll {
  (options?: { threshold: number }): [boolean, RefObject<HTMLElement>]
}

export const useScroll: IUseScroll = (options) => {
  const [isExist, setIsExist] = useState(false)
  const entryRef = useRef<HTMLElement>(null)

  const scrollHandler = useCallback(() => {
    if (!entryRef.current) return

    const refPosition =
      entryRef.current.getBoundingClientRect().top +
      window.scrollY -
      document.documentElement.clientTop

    const optionsThreshold = options ? refPosition * options.threshold : 0

    setIsExist((prevState) =>
      !prevState ? window.scrollY > refPosition - optionsThreshold : true
    )
  }, [options])

  useEffect(() => {
    scrollHandler()

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [scrollHandler])

  return [isExist, entryRef]
}

export const useLockScroll = (delay: number) => {
  const [scrollbarWidth, setScrollbartWidth] = useState<number | null>(null)

  const lockScroll = () => {
    document.body.classList.add('_lock-scroll')
  }

  const unlockScroll = () => {
    setTimeout(() => {
      document.body.classList.remove('_lock-scroll')
    }, delay)
  }

  useEffect(() => {
    setScrollbartWidth(window.innerWidth - document.body.offsetWidth)

    document.body.style.setProperty('--scrollbar-width', scrollbarWidth + 'px')
  }, [scrollbarWidth])

  return { lockScroll, unlockScroll }
}
