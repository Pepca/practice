import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { PopupContextProvider } from '../context/popup.context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PopupContextProvider>
      <Component {...pageProps} />
    </PopupContextProvider>
  )
}

export default MyApp
