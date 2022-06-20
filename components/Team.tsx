import { useEffect, useRef } from 'react'

import { setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Team.module.scss'

const {
  team,
  team__inner,
  team__title,
  team__list,
  teamItem,
  teamItem__bg,
  teamItemInfo,
  teamItemInfo__title,
  teamItemInfo__text,
} = styles

const Team = () => {
  const itemInfoListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (itemInfoListRef.current) {
      const items = Array.from(itemInfoListRef.current?.children)

      items.map((item) => {
        const currentItem = item as HTMLLIElement

        const text = currentItem.querySelector('[data-text]') as HTMLDivElement
        const textHeight = text?.getBoundingClientRect().height
        const textParentElement = text.parentElement

        if (textParentElement) {
          textParentElement.style.setProperty(
            '--text-height-value',
            textHeight + 'px'
          )
        }
      })
    }
  }, [itemInfoListRef])

  return (
    <section
      id='team'
      className={setStaticClasses([team, '_section-secondary-bg'])}
    >
      <div className={setStaticClasses([team__inner, '_container'])}>
        <div className={setStaticClasses([team__title, '_section-title'])}>
          Команда
        </div>
        <ul ref={itemInfoListRef} className={team__list}>
          <li className={teamItem} tabIndex={0}>
            <div className={teamItem__bg}></div>
            <div className={teamItemInfo}>
              <div className={teamItemInfo__title}>Системный администратор</div>
              <div className={teamItemInfo__text} data-text>
                Create with simplicity in mind!
              </div>
            </div>
          </li>
          <li className={teamItem} tabIndex={0}>
            <div className={teamItem__bg}></div>
            <div className={teamItemInfo}>
              <div className={teamItemInfo__title}>Руководитель</div>
              <div className={teamItemInfo__text} data-text>
                Create with simplicity in mind!
              </div>
            </div>
          </li>
          <li className={teamItem} tabIndex={0}>
            <div className={teamItem__bg}></div>
            <div className={teamItemInfo}>
              <div className={teamItemInfo__title}>Инженер</div>
              <div className={teamItemInfo__text} data-text>
                Create with simplicity in mind!
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Team
