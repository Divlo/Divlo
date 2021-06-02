import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import UniversalCookie from 'universal-cookie'

import 'styles/global.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const universalCookie = new UniversalCookie()

/** how long in seconds, until the cookie expires (10 years) */
const COOKIE_MAX_AGE = 10 * 365.25 * 24 * 60 * 60

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { lang } = useTranslation()

  useEffect(() => {
    universalCookie.set('NEXT_LOCALE', lang, {
      path: '/',
      maxAge: COOKIE_MAX_AGE
    })
  }, [lang])

  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <Header />
      <main className='flex flex-1 flex-col md:mx-auto md:max-w-4xl lg:max-w-7xl'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default MyApp
