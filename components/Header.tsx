import { setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Header.module.scss'
import { AnchorLink } from './AnchorLink'

const { header, header__inner, headerNav, headerNav__list, headerNav__item } =
  styles

const Header = () => {
  return (
    <header className={header}>
      <div className={setStaticClasses([header__inner, '_container'])}>
        <nav className={headerNav}>
          <ul className={headerNav__list}>
            <AnchorLink href='about'>
              <li className={headerNav__item} tabIndex={0}>
                О нас
              </li>
            </AnchorLink>
            <AnchorLink href='services'>
              <li className={headerNav__item} tabIndex={0}>
                Услуги
              </li>
            </AnchorLink>
            <AnchorLink href='team'>
              <li className={headerNav__item} tabIndex={0}>
                Команда
              </li>
            </AnchorLink>
            <AnchorLink href='review'>
              <li className={headerNav__item} tabIndex={0}>
                Отзывы
              </li>
            </AnchorLink>

            <AnchorLink href='footer'>
              <li className={headerNav__item} tabIndex={0}>
                Контактные данные
              </li>
            </AnchorLink>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
