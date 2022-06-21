import Image from 'next/image'

import { useEffect, useRef } from 'react'

import { setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Team.module.scss'

import TeamBg1 from '../public/images/team1.jpg'
import TeamBg2 from '../public/images/team2.jpg'
import TeamBg3 from '../public/images/team3.jpg'

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
            <div className={teamItem__bg}>
              <Image
                src={TeamBg1.src}
                alt='team bg picture sis admin'
                width={TeamBg1.width}
                height={TeamBg1.height}
                layout='fixed'
              />
            </div>
            <div className={teamItemInfo}>
              <div className={teamItemInfo__title}>Системный администратор</div>
              <div className={teamItemInfo__text} data-text>
                Человек данной должности осуществляет всю работу, которая
                касается безопасности, обслуживания, настройки, установки ПО и
                работы устройств в офисе.
              </div>
            </div>
          </li>
          <li className={teamItem} tabIndex={0}>
            <div className={teamItem__bg}>
              <Image
                src={TeamBg2.src}
                alt='team bg picture admin'
                width={TeamBg2.width}
                height={TeamBg2.height}
                layout='fixed'
              />
            </div>
            <div className={teamItemInfo}>
              <div className={teamItemInfo__title}>Руководитель</div>
              <div className={teamItemInfo__text} data-text>
                Руководящая должность в студии обеспечивает всем необходимым
                команду для эффективной работы. Непосредственное общение с
                клиентами, передача информации, мотивация, поддержка, контроль.
              </div>
            </div>
          </li>
          <li className={teamItem} tabIndex={0}>
            <div className={teamItem__bg}>
              <Image
                src={TeamBg3.src}
                alt='team bg picture engineer'
                width={TeamBg3.width}
                height={TeamBg3.height}
                layout='fixed'
              />
            </div>
            <div className={teamItemInfo}>
              <div className={teamItemInfo__title}>Инженер</div>
              <div className={teamItemInfo__text} data-text>
                Техническая специальность или техническая должность предполагает
                наличие знаний у кандидата в комнонетном устройстве любого
                оборудования. Замена деталей, умение находить причину поломки,
                ответственный подход к работе.
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Team
