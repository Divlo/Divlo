import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

import { Main } from './design/Main'

export interface ErrorPageProps {
  statusCode: number
  message: string
}

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { message, statusCode } = props
  const { t } = useTranslation()

  return (
    <>
      <Main>
        <h1 className='my-6 font-semibold text-4xl'>
          {t('errors:error')}{' '}
          <span className='text-yellow dark:text-yellow-dark'>
            {statusCode}
          </span>
        </h1>
        <p className='text-center text-lg'>
          {message}{' '}
          <Link href='/'>
            <a className='text-yellow dark:text-yellow-dark hover:underline'>
              {t('errors:returnToHomePage')}
            </a>
          </Link>
        </p>
      </Main>

      <style jsx global>
        {`
          main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-width: 100vw;
            flex: 1;
          }
          #__next {
            display: flex;
            flex-direction: column;
            padding-top: 0;
            height: 100vh;
          }
        `}
      </style>
    </>
  )
}
