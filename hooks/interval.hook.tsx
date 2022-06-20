import type { TIntervalTimer } from '../typescript/type'

import { useCallback, useRef } from 'react'

interface IUseInterval {
  (): {
    timerID: TIntervalTimer
    reloadInterval: Function
    initialInterval: Function
    startInterval: Function
    stopInterval: Function
  }
}

interface IIntervalCallback {
  callback: Function | null
  delay: number
}

export const useInterval: IUseInterval = () => {
  const savedCallbackRef = useRef<IIntervalCallback>({
    callback: null,
    delay: 0,
  })
  const intervalIDRef = useRef<TIntervalTimer>()

  const initialInterval = useCallback((callback: Function, delay: number) => {
    savedCallbackRef.current = { callback, delay }
  }, [])

  const startInterval = useCallback(() => {
    intervalIDRef.current = setInterval(() => {
      if (savedCallbackRef.current.callback) savedCallbackRef.current.callback()
    }, savedCallbackRef.current.delay)
  }, [])

  const stopInterval = useCallback(() => {
    if (intervalIDRef.current) {
      clearInterval(intervalIDRef.current)
      intervalIDRef.current = null
    }
  }, [])

  const reloadInterval = useCallback(() => {
    stopInterval()
    startInterval()
  }, [startInterval, stopInterval])

  return {
    initialInterval,
    startInterval,
    reloadInterval,
    stopInterval,
    timerID: intervalIDRef.current,
  }
}
