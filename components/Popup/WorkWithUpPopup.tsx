import { EPopupName } from '../../typescript/enum'

import { Popup } from './MainPopup'
import { Input } from '../Input'
import { CustomSelect } from '../CustomSelect'
import { Textarea } from '../Textarea'

import styles from '../../styles/modules/Popup.module.scss'

const { popupForm, popupForm__list, popupFormItem, popupForm__btn } = styles

export const WorkWithUsPopup = () => {
  return (
    <Popup popupName={EPopupName.WorkWithUs}>
      <form className={popupForm}>
        <ul className={popupForm__list}>
          <li className={popupFormItem}>
            <Input
              type='text'
              id='first-name'
              name='applicant-first-name'
              label='Имя'
            />
          </li>
          <li className={popupFormItem}>
            <Input
              type='text'
              id='last-name'
              name='applicant-last-name'
              label='Фамилия'
            />
          </li>
          <li className={popupFormItem}>
            <Input
              type='text'
              id='middle-name'
              name='applicant-middle-name'
              label='Отчество'
            />
          </li>
          <li className={popupFormItem}>
            <Input
              type='tel'
              id='telephone'
              name='applicant-telephone'
              label='Номер телефона'
            />
          </li>
          <li className={popupFormItem}>
            <Input
              type='email'
              id='email'
              name='applicant-email'
              label='Ваш email'
            />
          </li>
          <li className={popupFormItem}>
            <CustomSelect
              label='Почему хочешь работать с нами?'
              selectList={[
                'Ищу подработку',
                'Ищу полноценную работу',
                'Заинтересовала компания',
                'Интересуюсь ИТ',
                'Хочу попробовать что-то новое',
                'По личным причинам',
              ]}
            />
          </li>
          <li className={popupFormItem}>
            <Textarea
              id='information'
              name='applicant-information'
              label='Расскажи о себе'
              maxHeight={182}
            />
          </li>
        </ul>
        <div className={popupForm__btn}>
          <button type='button'>Отправить</button>
        </div>
      </form>
    </Popup>
  )
}
