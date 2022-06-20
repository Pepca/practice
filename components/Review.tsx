import Image from 'next/image'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useWindow } from '../hooks/window.hook'

import { setDynamicClasses, setStaticClasses } from '../lib/classes.lib'

import styles from '../styles/modules/Review.module.scss'

import QuoteIcon from '../public/images/quote.png'

const REVIEWS_DATA = [
  {
    id: 0,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'DAVID JAMES',
    rating: 4,
  },
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'DAVID JAMES',
    rating: 5,
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
    name: 'DAVID JAMES',
    rating: 3,
  },
  {
    id: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'DAVID JAMES',
    rating: 2,
  },
]

const {
  review,
  review__inner,
  review__list,
  reviewItem,
  reviewItem__inner,
  reviewItem__text,
  reviewItem__icon,
  reviewItem__name,
  reviewItemRating,
  reviewItemRating__list,
  reviewItemRating__item,
  reviewControls,
  reviewControls__btn,
  reviewControls__line,
  _arrowLeft,
  _arrowRight,
  _minusStar,
} = styles

const Review = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1)
  const [activeSlideHeight, setActiveSlideHeight] = useState<number | null>(
    null
  )

  const reviewListRef = useRef<HTMLUListElement>(null)

  const { windowWidth } = useWindow()

  const slideNext = useCallback(() => {
    setActiveSlideIndex((prevState) => prevState + 1)

    if (activeSlideIndex === REVIEWS_DATA.length) {
      reviewListRef.current?.style.removeProperty('transition')
      setActiveSlideIndex(0)

      setTimeout(() => {
        reviewListRef.current?.style.setProperty(
          'transition',
          'transform .5s ease'
        )
        setActiveSlideIndex(1)
      }, 0)
    }
  }, [activeSlideIndex])

  const slidePrev = useCallback(() => {
    setActiveSlideIndex((prevState) => prevState - 1)

    if (activeSlideIndex === 0) {
      reviewListRef.current?.style.removeProperty('transition')
      setActiveSlideIndex(REVIEWS_DATA.length)

      setTimeout(() => {
        reviewListRef.current?.style.setProperty(
          'transition',
          'transform .5s ease'
        )
        setActiveSlideIndex(REVIEWS_DATA.length - 1)
      }, 0)
    }
  }, [activeSlideIndex])

  useEffect(() => {
    if (!reviewListRef.current) return

    const listReviews = Array.from(reviewListRef.current.children)

    const currentSlide = listReviews.filter(
      (slide, index) => index === activeSlideIndex
    )[0] as HTMLLIElement

    const currentSlideHeight = currentSlide.offsetHeight

    setActiveSlideHeight(currentSlideHeight)
  }, [activeSlideIndex, windowWidth])

  return (
    <section id='review' className={review}>
      <div
        className={review__inner}
        style={
          {
            '--active-slide-height': activeSlideHeight + 'px',
          } as React.CSSProperties
        }
      >
        <ul
          ref={reviewListRef}
          className={review__list}
          style={{
            transform: `translateX(-${activeSlideIndex * windowWidth}px)`,
            transition: 'transform .5s ease',
          }}
        >
          <li className={reviewItem}>
            <div
              className={setStaticClasses([reviewItem__inner, '_container'])}
            >
              <div className={reviewItem__text}>
                {REVIEWS_DATA[REVIEWS_DATA.length - 1].text}
              </div>
              <div className={reviewItem__icon}>
                <Image
                  src={QuoteIcon.src}
                  alt='quotes icon'
                  width={QuoteIcon.width}
                  height={QuoteIcon.height}
                  layout='fixed'
                />
              </div>
              <div className={reviewItem__name}>
                {REVIEWS_DATA[REVIEWS_DATA.length - 1].name}
              </div>
              <div className={reviewItemRating}>
                <ul className={reviewItemRating__list}>
                  {[...Array(5)].map((star, index) => (
                    <li
                      key={index}
                      className={setDynamicClasses({
                        staticClasses: [reviewItemRating__item],
                        dynamicClasses: [[_minusStar]],
                        conditions: [
                          index + 1 >
                            REVIEWS_DATA[REVIEWS_DATA.length - 1].rating,
                        ],
                      })}
                    >
                      <svg
                        enableBackground='new 0 0 32 32'
                        height='32px'
                        id='Layer_1'
                        version='1.1'
                        viewBox='0 0 32 32'
                        width='32px'
                        xmlSpace='preserve'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <path
                          d='M31.881,12.557c-0.277-0.799-0.988-1.384-1.844-1.511l-8.326-1.238l-3.619-7.514  C17.711,1.505,16.896,1,16,1c-0.896,0-1.711,0.505-2.092,1.294l-3.619,7.514l-8.327,1.238c-0.855,0.127-1.566,0.712-1.842,1.511  c-0.275,0.801-0.067,1.683,0.537,2.285l6.102,6.092l-1.415,8.451C5.2,30.236,5.569,31.09,6.292,31.588  C6.689,31.861,7.156,32,7.623,32c0.384,0,0.769-0.094,1.118-0.281L16,27.811l7.26,3.908C23.609,31.906,23.994,32,24.377,32  c0.467,0,0.934-0.139,1.332-0.412c0.723-0.498,1.09-1.352,0.947-2.203l-1.416-8.451l6.104-6.092  C31.947,14.239,32.154,13.357,31.881,12.557z M23.588,19.363c-0.512,0.51-0.744,1.229-0.627,1.934l1.416,8.451l-7.26-3.906  c-0.348-0.188-0.732-0.281-1.118-0.281c-0.384,0-0.769,0.094-1.117,0.281l-7.26,3.906l1.416-8.451  c0.118-0.705-0.114-1.424-0.626-1.934l-6.102-6.092l8.326-1.24c0.761-0.113,1.416-0.589,1.743-1.268L16,3.251l3.62,7.513  c0.328,0.679,0.982,1.154,1.742,1.268l8.328,1.24L23.588,19.363z'
                          fill='#333333'
                          id='star'
                        />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
          {REVIEWS_DATA.length > 0 &&
            REVIEWS_DATA.map((reviewElement) => (
              <li key={reviewElement.id} className={reviewItem}>
                <div
                  className={setStaticClasses([
                    reviewItem__inner,
                    '_container',
                  ])}
                >
                  <div className={reviewItem__text}>{reviewElement.text}</div>
                  <div className={reviewItem__icon}>
                    <Image
                      src={QuoteIcon.src}
                      alt='quotes icon'
                      width={QuoteIcon.width}
                      height={QuoteIcon.height}
                      layout='fixed'
                    />
                  </div>
                  <div className={reviewItem__name}>{reviewElement.name}</div>
                  <div className={reviewItemRating}>
                    <ul className={reviewItemRating__list}>
                      {[...Array(5)].map((star, index) => (
                        <li
                          key={index}
                          className={setDynamicClasses({
                            staticClasses: [reviewItemRating__item],
                            dynamicClasses: [[_minusStar]],
                            conditions: [index + 1 > reviewElement.rating],
                          })}
                        >
                          <svg
                            enableBackground='new 0 0 32 32'
                            height='32px'
                            id='Layer_1'
                            version='1.1'
                            viewBox='0 0 32 32'
                            width='32px'
                            xmlSpace='preserve'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                          >
                            <path
                              d='M31.881,12.557c-0.277-0.799-0.988-1.384-1.844-1.511l-8.326-1.238l-3.619-7.514  C17.711,1.505,16.896,1,16,1c-0.896,0-1.711,0.505-2.092,1.294l-3.619,7.514l-8.327,1.238c-0.855,0.127-1.566,0.712-1.842,1.511  c-0.275,0.801-0.067,1.683,0.537,2.285l6.102,6.092l-1.415,8.451C5.2,30.236,5.569,31.09,6.292,31.588  C6.689,31.861,7.156,32,7.623,32c0.384,0,0.769-0.094,1.118-0.281L16,27.811l7.26,3.908C23.609,31.906,23.994,32,24.377,32  c0.467,0,0.934-0.139,1.332-0.412c0.723-0.498,1.09-1.352,0.947-2.203l-1.416-8.451l6.104-6.092  C31.947,14.239,32.154,13.357,31.881,12.557z M23.588,19.363c-0.512,0.51-0.744,1.229-0.627,1.934l1.416,8.451l-7.26-3.906  c-0.348-0.188-0.732-0.281-1.118-0.281c-0.384,0-0.769,0.094-1.117,0.281l-7.26,3.906l1.416-8.451  c0.118-0.705-0.114-1.424-0.626-1.934l-6.102-6.092l8.326-1.24c0.761-0.113,1.416-0.589,1.743-1.268L16,3.251l3.62,7.513  c0.328,0.679,0.982,1.154,1.742,1.268l8.328,1.24L23.588,19.363z'
                              fill='#333333'
                              id='star'
                            />
                          </svg>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          <li className={reviewItem}>
            <div
              className={setStaticClasses([reviewItem__inner, '_container'])}
            >
              <div className={reviewItem__text}>{REVIEWS_DATA[0].text}</div>
              <div className={reviewItem__icon}>
                <Image
                  src={QuoteIcon.src}
                  alt='quotes icon'
                  width={QuoteIcon.width}
                  height={QuoteIcon.height}
                  layout='fixed'
                />
              </div>
              <div className={reviewItem__name}>{REVIEWS_DATA[0].name}</div>
              <div className={reviewItemRating}>
                <ul className={reviewItemRating__list}>
                  {[...Array(5)].map((star, index) => (
                    <li
                      key={index}
                      className={setDynamicClasses({
                        staticClasses: [reviewItemRating__item],
                        dynamicClasses: [[_minusStar]],
                        conditions: [index + 1 > REVIEWS_DATA[0].rating],
                      })}
                    >
                      <svg
                        enableBackground='new 0 0 32 32'
                        height='32px'
                        id='Layer_1'
                        version='1.1'
                        viewBox='0 0 32 32'
                        width='32px'
                        xmlSpace='preserve'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                      >
                        <path
                          d='M31.881,12.557c-0.277-0.799-0.988-1.384-1.844-1.511l-8.326-1.238l-3.619-7.514  C17.711,1.505,16.896,1,16,1c-0.896,0-1.711,0.505-2.092,1.294l-3.619,7.514l-8.327,1.238c-0.855,0.127-1.566,0.712-1.842,1.511  c-0.275,0.801-0.067,1.683,0.537,2.285l6.102,6.092l-1.415,8.451C5.2,30.236,5.569,31.09,6.292,31.588  C6.689,31.861,7.156,32,7.623,32c0.384,0,0.769-0.094,1.118-0.281L16,27.811l7.26,3.908C23.609,31.906,23.994,32,24.377,32  c0.467,0,0.934-0.139,1.332-0.412c0.723-0.498,1.09-1.352,0.947-2.203l-1.416-8.451l6.104-6.092  C31.947,14.239,32.154,13.357,31.881,12.557z M23.588,19.363c-0.512,0.51-0.744,1.229-0.627,1.934l1.416,8.451l-7.26-3.906  c-0.348-0.188-0.732-0.281-1.118-0.281c-0.384,0-0.769,0.094-1.117,0.281l-7.26,3.906l1.416-8.451  c0.118-0.705-0.114-1.424-0.626-1.934l-6.102-6.092l8.326-1.24c0.761-0.113,1.416-0.589,1.743-1.268L16,3.251l3.62,7.513  c0.328,0.679,0.982,1.154,1.742,1.268l8.328,1.24L23.588,19.363z'
                          fill='#333333'
                          id='star'
                        />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <div className={setStaticClasses([reviewControls, '_container'])}>
          <button
            type='button'
            className={setStaticClasses([reviewControls__btn, _arrowLeft])}
            onClick={slidePrev}
          >
            <svg
              height='48'
              viewBox='0 0 48 48'
              width='48'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 0h48v48h-48z' fill='none' />
              <path d='M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z' />
            </svg>
          </button>
          <div className={reviewControls__line}></div>
          <button
            type='button'
            className={setStaticClasses([reviewControls__btn, _arrowRight])}
            onClick={slideNext}
          >
            <svg
              height='48'
              viewBox='0 0 48 48'
              width='48'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 0h48v48h-48z' fill='none' />
              <path d='M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z' />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Review
