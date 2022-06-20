import { EPopupName } from '../typescript/enum'
import { IChildrenProps } from '../typescript/interface'

import { createContext, useContext, useState } from 'react'

import { useLockScroll } from '../hooks/scroll.hook'

type TPopupState = {
  [key in EPopupName]: boolean
}

interface IPopupStateStorage {
  popupState: TPopupState
  openPopup: (popupName: string) => void
  closePopup: (popupName: string) => void
}

const PopupStateStorage = createContext<IPopupStateStorage | null>(null)

export const PopupContextProvider = ({ children }: IChildrenProps) => {
  const [popupState, setPopupState] = useState<TPopupState>({
    workWithUs: false,
    issues: false,
  })

  const { lockScroll, unlockScroll } = useLockScroll(200)

  const openPopup = (popupName: string) => {
    setPopupState((prevState) => ({ ...prevState, [popupName]: true }))
    lockScroll()
  }

  const closePopup = (popupName: string) => {
    setPopupState((prevState) => ({ ...prevState, [popupName]: false }))
    unlockScroll()
  }

  return (
    <PopupStateStorage.Provider value={{ popupState, openPopup, closePopup }}>
      {children}
    </PopupStateStorage.Provider>
  )
}

export const usePopupContext = () => {
  const context = useContext(PopupStateStorage)

  if (context === null) {
    throw new Error(
      'usePopupContext must be used within a PopupContenxtProvider'
    )
  }

  return { ...context }
}
