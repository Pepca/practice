import Link from 'next/link'

import { AnchorLink } from './AnchorLink'

import { FocusEvent, MouseEvent, useRef, useState } from 'react'

import { setDynamicClasses, setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Footer.module.scss'

const {
  footer,
  footer__inner,
  footerNav,
  footerNav__list,
  footerNav__item,
  footerNav__line,
  _show,
  footerContacts,
  footerSocials,
  footerSocials__list,
  footerSocials__item,
} = styles

const Footer = () => {
  const [currentPositionX, setCurrentPositionX] = useState(0)
  const [currentWidth, setCurrentWidth] = useState(50)
  const [isLineHide, setIsLineHide] = useState(true)

  const navListRef = useRef<HTMLUListElement>(null)

  const moveLineHandler = (
    event: MouseEvent<HTMLLIElement> | FocusEvent<HTMLLIElement>
  ) => {
    const target = event.type === 'focus' ? event.target : event.currentTarget

    // @ts-ignore
    const targetWidth = target.offsetWidth
    // @ts-ignore
    const parentTarget = navListRef.current

    if (parentTarget)
      setCurrentPositionX(
        // @ts-ignore
        Math.abs(parentTarget.offsetLeft - target.parentElement.offsetLeft)
      )

    setCurrentWidth(targetWidth)
  }

  const mouseEnterHandler = () => setIsLineHide(false)

  const mouseLeaveHandler = () => setIsLineHide(true)

  const focusHandler = () => setIsLineHide(false)

  const blurHandler = () => setIsLineHide(true)

  return (
    <footer id='footer' className={footer}>
      <div className={setStaticClasses([footer__inner, '_container'])}>
        <nav className={footerNav}>
          <ul
            ref={navListRef}
            className={footerNav__list}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
          >
            <AnchorLink href='intro'>
              <li
                className={footerNav__item}
                tabIndex={0}
                onMouseEnter={moveLineHandler}
                onFocus={moveLineHandler}
              >
                Главная
              </li>
            </AnchorLink>

            <AnchorLink href='about'>
              <li
                className={footerNav__item}
                tabIndex={0}
                onMouseEnter={moveLineHandler}
                onFocus={moveLineHandler}
              >
                О нас
              </li>
            </AnchorLink>

            <AnchorLink href='services'>
              <li
                className={footerNav__item}
                tabIndex={0}
                onMouseEnter={moveLineHandler}
                onFocus={moveLineHandler}
              >
                Услуги
              </li>
            </AnchorLink>

            <AnchorLink href='team'>
              <li
                className={footerNav__item}
                tabIndex={0}
                onMouseEnter={moveLineHandler}
                onFocus={moveLineHandler}
              >
                Команда
              </li>
            </AnchorLink>

            <AnchorLink href='review'>
              <li
                className={footerNav__item}
                tabIndex={0}
                onMouseEnter={moveLineHandler}
                onFocus={moveLineHandler}
              >
                Отзывы
              </li>
            </AnchorLink>
          </ul>
          <div
            className={setDynamicClasses({
              staticClasses: [footerNav__line],
              dynamicClasses: [[_show]],
              conditions: [!isLineHide],
            })}
          >
            <span
              style={{
                transform: `translateX(${currentPositionX}px)`,
                width: `${currentWidth}px`,
              }}
            ></span>
          </div>
        </nav>
        <div className={footerContacts}>
          <p>Алтайский край, рп.Тальменка, ул. Чернышевского 19</p>
          <p>+7 (913) 027-01-01 - nik.aleksandrovich.74@list.ru</p>
        </div>
        <div className={footerSocials}>
          <ul className={footerSocials__list}>
            <li className={footerSocials__item}>
              <Link href='#'>
                <a target='_blank' rel='noopener'>
                  <svg
                    enableBackground='new 0 0 56.693 56.693'
                    height='56.693px'
                    id='Layer_1'
                    version='1.1'
                    viewBox='0 0 56.693 56.693'
                    width='56.693px'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029  c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77  L40.43,21.739z' />
                  </svg>
                </a>
              </Link>
            </li>
            <li className={footerSocials__item}>
              <Link href='#'>
                <a target='_blank' rel='noopener'>
                  <svg viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z' />
                  </svg>
                </a>
              </Link>
            </li>
            <li className={footerSocials__item}>
              <Link href='#'>
                <a target='_blank' rel='noopener'>
                  <svg
                    height='512'
                    viewBox='0 0 512 512'
                    width='512'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <title />
                    <path
                      d='M484.7,132c3.56-11.28,0-19.48-15.75-19.48H416.58c-13.21,0-19.31,7.18-22.87,14.86,0,0-26.94,65.6-64.56,108.13-12.2,12.3-17.79,16.4-24.4,16.4-3.56,0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14,0-13.22,6.15-13.22,12.3,0,12.81,18.81,15.89,20.84,51.76V254c0,16.91-3,20-9.66,20-17.79,0-61-66.11-86.92-141.44C105,117.64,99.88,112,86.66,112H33.79C18.54,112,16,119.17,16,126.86c0,13.84,17.79,83.53,82.86,175.77,43.21,63,104.72,96.86,160.13,96.86,33.56,0,37.62-7.69,37.62-20.5V331.33c0-15.37,3.05-17.93,13.73-17.93,7.62,0,21.35,4.09,52.36,34.33C398.28,383.6,404.38,400,424.21,400h52.36c15.25,0,22.37-7.69,18.3-22.55-4.57-14.86-21.86-36.38-44.23-62-12.2-14.34-30.5-30.23-36.09-37.92-7.62-10.25-5.59-14.35,0-23.57-.51,0,63.55-91.22,70.15-122'
                      style={{ fillRule: 'evenodd' }}
                    />
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
