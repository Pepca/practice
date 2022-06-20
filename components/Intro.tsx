import Image from 'next/image'

import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useInterval } from '../hooks/interval.hook'

import { setDynamicClasses, setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Intro.module.scss'

import BgSlidePicture1 from '../public/images/bg1.jpg'
import BgSlidePicture2 from '../public/images/bg2.jpg'
import BgSlidePicture3 from '../public/images/bg3.jpg'

const {
  intro,
  intro__inner,
  introInfo,
  introInfo__title,
  introInfo__subtitle,
  introSlider,
  introSlider__container,
  introSlider__item,
  _active,
  introDots,
  introDots__list,
  introDots__item,
} = styles

const slides = [
  {
    id: 0,
    src: BgSlidePicture1.src,
    width: BgSlidePicture1.width,
    height: BgSlidePicture1.height,
  },
  {
    id: 1,
    src: BgSlidePicture2.src,
    width: BgSlidePicture2.width,
    height: BgSlidePicture2.height,
  },
  {
    id: 2,
    src: BgSlidePicture3.src,
    width: BgSlidePicture3.width,
    height: BgSlidePicture3.height,
  },
]

const Intro = () => {
  const [slideIndex, setSlideIndex] = useState(0)

  const { initialInterval, startInterval, stopInterval, reloadInterval } =
    useInterval()

  const slideNext = useCallback(() => {
    setSlideIndex((prev) => prev + 1)

    if (slideIndex === slides.length - 1) {
      setSlideIndex(0)
    }
  }, [slideIndex])

  const actionDotsHandler = (
    event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>
  ) => {
    const target = event.currentTarget
    const targetContent = target.textContent

    // @ts-ignore
    if (event.type === 'keydown' && event.code === 'Enter')
      setSlideIndex(Number(targetContent?.replace('0', '')) - 1)
    else if (event.type === 'click')
      setSlideIndex(Number(targetContent?.replace('0', '')) - 1)

    reloadInterval()
  }

  useEffect(() => {
    initialInterval(() => {
      slideNext()
    }, 5000)
  }, [initialInterval, slideNext])

  useEffect(() => {
    startInterval()

    return () => stopInterval()
  }, [startInterval, stopInterval])
  return (
    <section id='intro' className={intro}>
      <div className={setStaticClasses([intro__inner, '_container'])}>
        <div className={introInfo}>
          <h1 className={introInfo__title}>WHERE GREAT IDEAS COME TO LIFE</h1>
          <h4 className={introInfo__subtitle}>
            Passionate creative studio helping startups grow their business!
          </h4>
        </div>
        <div className={introDots}>
          <ul className={introDots__list}>
            {slides.length > 0 &&
              slides.map((slide) => (
                <li
                  key={slide.id}
                  className={setDynamicClasses({
                    staticClasses: [introDots__item],
                    dynamicClasses: [[_active]],
                    conditions: [slideIndex === slide.id],
                  })}
                  onClick={actionDotsHandler}
                  onKeyDown={actionDotsHandler}
                  tabIndex={0}
                >
                  0{slide.id + 1}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={introSlider}>
        <ul className={introSlider__container}>
          {slides.length > 0 &&
            slides.map((slide) => (
              <li
                key={slide.id}
                className={setDynamicClasses({
                  staticClasses: [introSlider__item],
                  dynamicClasses: [[_active]],
                  conditions: [slideIndex === slide.id],
                })}
              >
                <Image
                  src={slide.src}
                  width={slide.width}
                  height={slide.height}
                  alt={`slide bg intro ${slide.id}`}
                  layout='fixed'
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}

export default Intro
