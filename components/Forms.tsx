import { EPopupName } from '../typescript/enum'
import { KeyboardEvent } from 'react'

import Image from 'next/image'

import { usePopupContext } from '../context/popup.context'

import { setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Forms.module.scss'

import BriefcaseIcon from '../public/icons/briefcase.png'
import MailLetterIcon from '../public/icons/mail.png'

const {
  forms,
  forms__inner,
  forms__list,
  formsItem,
  formsItem__icon,
  formsItem__title,
  formsItem__subtitle,
  _workWithUs,
  _Issues,
} = styles

const Forms = () => {
  const { openPopup } = usePopupContext()

  const keyDownHandler = (
    popupName: EPopupName,
    event: KeyboardEvent<HTMLLIElement>
  ) => {
    if (event.code === 'Enter') openPopup(popupName)
  }

  return (
    <section className={forms}>
      <div className={forms__inner}>
        <ul className={forms__list}>
          <li
            className={setStaticClasses([formsItem, _workWithUs])}
            onClick={openPopup.bind(null, EPopupName.WorkWithUs)}
            onKeyDown={keyDownHandler.bind(null, EPopupName.WorkWithUs)}
            tabIndex={0}
          >
            <div className={formsItem__icon}>
              <Image
                src={BriefcaseIcon.src}
                alt='Briefcase icon form'
                width={BriefcaseIcon.width}
                height={BriefcaseIcon.height}
                layout='fixed'
              />
            </div>
            <div className={formsItem__title}>Хочешь работать с нами?</div>
            <div className={formsItem__subtitle}>Отлично. Расскажи о себе!</div>
          </li>
          <li
            className={setStaticClasses([formsItem, _Issues])}
            onClick={openPopup.bind(null, EPopupName.Issues)}
            onKeyDown={keyDownHandler.bind(null, EPopupName.Issues)}
            tabIndex={0}
          >
            <div className={formsItem__icon}>
              <Image
                src={MailLetterIcon.src}
                alt='Briefcase icon form'
                width={MailLetterIcon.width}
                height={MailLetterIcon.height}
                layout='fixed'
              />
            </div>
            <div className={formsItem__title}>Связаться с нами</div>
            <div className={formsItem__subtitle}>
              Расскажи нам о своей проблеме
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Forms
