import { useEffect, useState } from 'react'

export const useWindow = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const resizeWindowHandler = () => setWindowWidth(window.innerWidth)

    resizeWindowHandler()

    window.addEventListener('resize', resizeWindowHandler)

    return () => window.removeEventListener('resize', resizeWindowHandler)
  }, [])

  return { windowWidth }
}
