import type { IChildrenProps } from '../../typescript/interface'

import Head from 'next/head'

import Header from '../Header'
import Footer from '../Footer'

interface IMainLayoutProps extends IChildrenProps {
  title?: string
}

export const MainLayout = ({
  children,
  title = 'Document',
}: IMainLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='wrapper'>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}
