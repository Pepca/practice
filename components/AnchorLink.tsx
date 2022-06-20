import type { KeyboardEvent, MouseEvent } from 'react'
import type { TChildrenProp } from '../typescript/type'

import Link from 'next/link'

interface IAnchorLinkProps {
  href: string
  children: TChildrenProp | string
}

export const AnchorLink = ({ href, children }: IAnchorLinkProps) => {
  const getCurrentBlockScrollPosition = () => {
    const currentBlock = document.getElementById(href)

    if (!currentBlock) return

    const currentPosition =
      window.scrollY + currentBlock?.getBoundingClientRect().top

    return currentPosition
  }

  const clickAnchorLinkHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const scrollPosition = getCurrentBlockScrollPosition()

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    })
  }

  const enterAnchorLinkHandler = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.code !== 'Enter') return

    const scrollPosition = getCurrentBlockScrollPosition()

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    })
  }

  return (
    <Link href='#'>
      <a
        tabIndex={-1}
        onClick={clickAnchorLinkHandler}
        onKeyDown={enterAnchorLinkHandler}
      >
        {children}
      </a>
    </Link>
  )
}
