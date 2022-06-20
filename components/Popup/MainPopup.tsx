import { EPopupName } from '../../typescript/enum'
import type { TChildrenProp } from '../../typescript/type'

import { MouseEvent } from 'react'

import { usePopupContext } from '../../context/popup.context'

import { setDynamicClasses } from '../../lib/classes.lib'

import styles from '../../styles/modules/Popup.module.scss'

interface IPopupProps {
  children: TChildrenProp
  popupName: EPopupName
}

const { popup, popup__inner, popupClose, popupClose__inner, _activePopup } =
  styles

export const Popup = ({ popupName, children }: IPopupProps) => {
  const { popupState, closePopup } = usePopupContext()

  const clickPopupHandler = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement

    if (!target.closest('.' + popup__inner)) {
      closePopup(popupName)
    }
  }

  return (
    <div
      className={setDynamicClasses({
        staticClasses: [popup],
        dynamicClasses: [[_activePopup]],
        conditions: [popupState[popupName]],
      })}
      onClick={clickPopupHandler}
    >
      <div className={popup__inner}>
        <button
          type='button'
          className={popupClose}
          onClick={closePopup.bind(null, popupName)}
        >
          <div className={popupClose__inner}></div>
        </button>
        {children}
      </div>
    </div>
  )
}
