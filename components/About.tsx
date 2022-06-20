import Image from 'next/image'

import { useScroll } from '../hooks/scroll.hook'

import { setDynamicClasses, setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/About.module.scss'

import FirstImage from '../public/images/inner_pc_about.jpg'
import LastImage from '../public/images/pc_about2.jpg'

const {
  about,
  about__inner,
  about__list,
  aboutItem,
  aboutItem__inner,
  aboutItemInfo,
  aboutItemInfo__title,
  aboutItemInfo__subtitle,
  aboutItemInfoText,
  aboutItemInfoText__list,
  aboutItemInfoText__paragraph,
  aboutItem__picture,
  _firstAboutPicture,
  _backgroundAboutPicture,
  _lastAboutPicture,
  _activeScrollAnimation,
} = styles

const About = () => {
  const [isExist, ref] = useScroll({ threshold: 0.4 })

  return (
    <section
      ref={ref}
      className={setDynamicClasses({
        staticClasses: [about, '_section-secondary-bg'],
        dynamicClasses: [[_activeScrollAnimation]],
        conditions: [isExist],
      })}
      id='about'
    >
      <div className={setStaticClasses([about__inner, '_container'])}>
        <ul className={about__list}>
          <li className={setStaticClasses([aboutItem, _firstAboutPicture])}>
            <div className={aboutItem__inner}>
              <div className={aboutItemInfo}>
                <div className={aboutItemInfo__title}>WE ARE</div>
                <div className={aboutItemInfo__subtitle}>THE SQWD</div>
                <div className={aboutItemInfoText}>
                  <ul className={aboutItemInfoText__list}>
                    <li className={aboutItemInfoText__paragraph}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </li>
                  </ul>
                </div>
              </div>
              <div className={aboutItem__picture}>
                <Image
                  src={FirstImage.src}
                  alt=''
                  width={FirstImage.width}
                  height={FirstImage.height}
                  layout='fixed'
                />
              </div>
            </div>
          </li>
          <li
            className={setStaticClasses([aboutItem, _backgroundAboutPicture])}
          ></li>
          <li className={setStaticClasses([aboutItem, _lastAboutPicture])}>
            <div className={aboutItem__inner}>
              <div className={aboutItemInfo}>
                <div className={aboutItemInfoText}>
                  <ul className={aboutItemInfoText__list}>
                    <li className={aboutItemInfoText__paragraph}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </li>
                  </ul>
                </div>
              </div>
              <div className={aboutItem__picture}>
                <Image
                  src={LastImage.src}
                  alt=''
                  width={LastImage.width}
                  height={LastImage.height}
                  layout='fixed'
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default About
