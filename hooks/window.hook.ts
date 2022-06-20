import { useEffect, useState } from 'react'

export const useWindow = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
    }
  }, [])

  return { windowWidth }
}
