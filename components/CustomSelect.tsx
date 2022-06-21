import { KeyboardEvent, MouseEvent, useEffect, useRef } from 'react'

import { useState } from 'react'
import { usePopupContext } from '../context/popup.context'
import { setDynamicClasses } from '../lib/classes.lib'

import styles from '../styles/modules/CustomSelect.module.scss'

interface ICustomSelectProps {
  label: string
  selectList: string[]
  name: string
  value: string
  selectHandler: (targetText: string) => void
}

const {
  customSelect,
  customSelect__title,
  customSelectElement,
  customSelectElementHead,
  customSelectElementHead__value,
  customSelectElementHead__icon,
  customSelectElementBody,
  customSelectElementBody__list,
  customSelectElementBody__item,
  _selectOpen,
} = styles

export const CustomSelect = ({
  label,
  selectList,
  name,
  value,
  selectHandler,
}: ICustomSelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const { popupState } = usePopupContext()

  const selectElementBodyRef = useRef<HTMLDivElement>(null)

  const actionHeadHandler = (
    event:
      | MouseEvent<HTMLDivElement | HTMLLabelElement>
      | KeyboardEvent<HTMLDivElement>
  ) => {
    // @ts-ignore
    if (event.type === 'keydown' && event.code === 'Enter')
      setIsSelectOpen((prevState) => !prevState)
    else if (event.type === 'click') {
      setIsSelectOpen((prevState) => !prevState)
    }
  }

  const actionSelectItemHandler = (
    event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>
  ) => {
    const target = event.currentTarget
    const targetText = target.textContent

    if (targetText) {
      // @ts-ignore
      if (event.type === 'keydown' && event.code === 'Enter') {
        selectHandler(targetText)
      } else if (event.type === 'click') {
        selectHandler(targetText)
      }
    }

    // @ts-ignore
    if (event.type === 'keydown' && event.code === 'Enter') {
      setIsSelectOpen(false)
    } else if (event.type === 'click') {
      setIsSelectOpen(false)
    }
  }

  useEffect(() => {
    if (popupState.issues === false || popupState.workWithUs === false) {
      setIsSelectOpen(false)
    }
  }, [popupState])

  useEffect(() => {
    if (selectElementBodyRef.current) {
      if (isSelectOpen) {
        selectElementBodyRef.current.focus()
      }
    }
  }, [isSelectOpen])

  useEffect(() => {
    const globalClickHandler: EventListener = (event) => {
      const target = event.target as Element

      if (
        isSelectOpen &&
        !target.closest('.' + customSelectElementBody) &&
        !target.closest('.' + customSelectElementHead)
      ) {
        setIsSelectOpen(false)
      }
    }

    document.addEventListener('click', globalClickHandler)

    return () => document.removeEventListener('click', globalClickHandler)
  }, [isSelectOpen])

  return (
    <div
      className={setDynamicClasses({
        staticClasses: [customSelect],
        dynamicClasses: [[_selectOpen]],
        conditions: [
          (popupState.issues || popupState.workWithUs) && isSelectOpen,
        ],
      })}
    >
      <label className={customSelect__title} onClick={actionHeadHandler}>
        {label}
      </label>
      <div className={customSelectElement}>
        <div
          className={customSelectElementHead}
          onClick={actionHeadHandler}
          onKeyDown={actionHeadHandler}
          tabIndex={0}
        >
          <div className={customSelectElementHead__value}>
            {value !== '' ? value : 'Выбери...'}
          </div>
          <div className={customSelectElementHead__icon}>
            <svg viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'>
              <title />
              <path d='M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z' />
            </svg>
          </div>
        </div>
        <div className={customSelectElementBody} ref={selectElementBodyRef}>
          <ul className={customSelectElementBody__list} tabIndex={0}>
            {selectList.length > 0 &&
              selectList.map((select, index) => (
                <li
                  key={index}
                  className={customSelectElementBody__item}
                  onClick={actionSelectItemHandler}
                  onKeyDown={actionSelectItemHandler}
                  tabIndex={0}
                >
                  {select}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <input type='text' defaultValue={value} name={name} />
    </div>
  )
}
