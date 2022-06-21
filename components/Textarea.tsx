import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { setDynamicClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Textarea.module.scss'

interface ITexteareaProps {
  id: string
  name: string
  label: string
  maxHeight?: number
  value: string
  changeHandler: ChangeEventHandler
}

const { textareaElement, _isTyping, _isFocused, _lockScrollbar } = styles

export const Textarea = ({
  id,
  name,
  label,
  maxHeight,
  value,
  changeHandler,
}: ITexteareaProps) => {
  const [isFocus, setIsFocus] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const defaultTextareaHeightRef = useRef<number>(0)

  const autosizeTextarea = (eventTarget: HTMLTextAreaElement) => {
    eventTarget.style.height = '100%'

    if (eventTarget.scrollHeight > defaultTextareaHeightRef.current) {
      eventTarget.style.height = eventTarget.scrollHeight + 'px'
    } else {
      eventTarget.style.height = defaultTextareaHeightRef.current + 'px'
    }

    if (maxHeight && eventTarget.scrollHeight > maxHeight) {
      eventTarget.style.height = maxHeight + 'px'
      eventTarget.classList.remove(_lockScrollbar)
    } else {
      eventTarget.classList.add(_lockScrollbar)
    }
  }

  const focusHandler = () => {
    setIsFocus(true)
  }

  const blurHandler = () => {
    if (value === '') setIsFocus(false)
  }

  useEffect(() => {
    if (textareaRef.current) {
      defaultTextareaHeightRef.current =
        textareaRef.current.getBoundingClientRect().height
    }
  }, [])

  return (
    <div
      className={setDynamicClasses({
        staticClasses: [textareaElement],
        dynamicClasses: [[_isTyping], [_isFocused]],
        conditions: [value !== '', isFocus],
      })}
    >
      <label htmlFor={id}>{label}</label>
      <textarea
        ref={textareaRef}
        name={name}
        id={id}
        value={value}
        onChange={(event) => {
          autosizeTextarea(event.target)
          changeHandler(event)
        }}
        onFocus={focusHandler}
        onBlur={blurHandler}
      ></textarea>
    </div>
  )
}
