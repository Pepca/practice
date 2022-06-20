import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

import { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'

import { setDynamicClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Input.module.scss'

interface IInputProps {
  id: string
  type: HTMLInputTypeAttribute
  label: string
  name: string
}

const { inputElement, _isFocused, _isTyping } = styles

export const Input = ({ id, type, label, name }: IInputProps) => {
  const [value, setValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const ref = useRef(null)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const focusHandler = () => {
    setIsFocus(true)
  }

  const blurHandler = () => {
    if (value === '') setIsFocus(false)
  }

  return (
    <div
      className={setDynamicClasses({
        staticClasses: [inputElement],
        dynamicClasses: [[_isFocused], [_isTyping]],
        conditions: [isFocus, value !== ''],
      })}
    >
      <label htmlFor={id}>{label}</label>
      {type === 'tel' ? (
        <IMaskInput
          ref={ref}
          mask={'+0 (000) 000-00-00'}
          id={id}
          type={type}
          name={name}
          value={value}
          // @ts-ignore
          onAccept={(value) => setValue(value)}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      )}
    </div>
  )
}
