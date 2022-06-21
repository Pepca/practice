import { EPopupName } from '../../typescript/enum'
import {
  IResponseData,
  IResponseMessageState,
} from '../../typescript/interface'

import Image from 'next/image'

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

import { Popup } from './MainPopup'
import { Input } from '../Input'
import { CustomSelect } from '../CustomSelect'
import { Textarea } from '../Textarea'
import { ResponseMessage } from '../ResponseMessage'

import { useHttp } from '../../hooks/http.hook'

import { setDynamicClasses } from '../../lib/classes.lib'

import styles from '../../styles/modules/Popup.module.scss'

import LoaderIcon from '../../public/icons/loader.gif'

const { popupForm, popupForm__list, popupFormItem, popupForm__btn, _sending } =
  styles

export const WorkWithUsPopup = () => {
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    telephone: '',
    email: '',
    details: '',
    select: '',
  })
  const [responseMessageState, setResponseMessageState] =
    useState<IResponseMessageState>({
      message: 'Ответ от сервера',
      type: undefined,
      isOpen: false,
    })

  const timerIDRef = useRef<NodeJS.Timeout | null>()

  const { isRequestInProcess, request } = useHttp()

  const resetForm = () => {
    setFormValue((prevState) => ({
      ...prevState,
      firstName: '',
      lastName: '',
      middleName: '',
      telephone: '',
      email: '',
      details: '',
      select: '',
    }))
  }

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault()

    const responseData = await request<IResponseData>('api/email', {
      method: 'POST',
      body: JSON.stringify(formValue),
    })

    if (responseData) {
      setResponseMessageState((prevState) => ({
        ...prevState,
        message: responseData.message,
        type: responseData.success,
        isOpen: true,
      }))

      if (responseData.success) resetForm()

      timerIDRef.current = setTimeout(() => {
        setResponseMessageState((prevState) => ({
          ...prevState,
          isOpen: false,
        }))
      }, 5000)
    }
  }

  const closeResponseMessageHandler = () => {
    setResponseMessageState((prevState) => ({ ...prevState, isOpen: false }))
  }

  const imaskInputHandler = (value: string) => {
    setFormValue((prevState) => ({ ...prevState, telephone: value }))
  }

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const selectHandler = (targetText: string) => {
    setFormValue((prevState) => ({ ...prevState, select: targetText }))
  }

  useEffect(() => {
    if (isRequestInProcess && responseMessageState.isOpen) {
      setResponseMessageState((prevState) => ({ ...prevState, isOpen: false }))

      if (timerIDRef.current) {
        clearTimeout(timerIDRef.current)
        timerIDRef.current = null
      }
    }
  }, [isRequestInProcess, responseMessageState])

  return (
    <>
      <ResponseMessage
        message={responseMessageState.message}
        type={responseMessageState.type}
        isOpenState={responseMessageState.isOpen}
        handler={closeResponseMessageHandler}
      />
      <Popup popupName={EPopupName.WorkWithUs}>
        <form className={popupForm} onSubmit={submitFormHandler} noValidate>
          <ul className={popupForm__list}>
            <li className={popupFormItem}>
              <Input
                type='text'
                id='firstName'
                name='firstName'
                label='Имя'
                value={formValue.firstName}
                changeHandler={changeHandler}
              />
            </li>
            <li className={popupFormItem}>
              <Input
                type='text'
                id='lastName'
                name='lastName'
                label='Фамилия'
                value={formValue.lastName}
                changeHandler={changeHandler}
              />
            </li>
            <li className={popupFormItem}>
              <Input
                type='text'
                id='middleName'
                name='middleName'
                label='Отчество'
                value={formValue.middleName}
                changeHandler={changeHandler}
              />
            </li>
            <li className={popupFormItem}>
              <Input
                type='tel'
                id='telephone'
                name='telephone'
                label='Номер телефона'
                value={formValue.telephone}
                imaskInputHandler={imaskInputHandler}
              />
            </li>
            <li className={popupFormItem}>
              <Input
                type='email'
                id='email'
                name='email'
                label='Ваш email'
                value={formValue.email}
                changeHandler={changeHandler}
              />
            </li>
            <li className={popupFormItem}>
              <CustomSelect
                name='select'
                label='Почему хочешь работать с нами?'
                selectList={[
                  'Ищу подработку',
                  'Ищу полноценную работу',
                  'Заинтересовала компания',
                  'Интересуюсь ИТ',
                  'Хочу попробовать что-то новое',
                  'По личным причинам',
                ]}
                value={formValue.select}
                selectHandler={selectHandler}
              />
            </li>
            <li className={popupFormItem}>
              <Textarea
                id='details'
                name='details'
                label='Расскажи о себе'
                maxHeight={182}
                value={formValue.details}
                changeHandler={changeHandler}
              />
            </li>
          </ul>
          <div
            className={setDynamicClasses({
              staticClasses: [popupForm__btn],
              dynamicClasses: [[_sending]],
              conditions: [isRequestInProcess],
            })}
          >
            <button type='submit' disabled={isRequestInProcess}>
              {isRequestInProcess ? (
                <Image
                  src={LoaderIcon.src}
                  alt='loader icon'
                  width={30}
                  height={30}
                  layout='fixed'
                />
              ) : (
                'Отправить'
              )}
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}
