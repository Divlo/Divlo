import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { ErrorPage } from 'components/ErrorPage'
import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const Error500: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title='Divlo - 500' />

      <Header showLanguages />
      <ErrorPage statusCode={500} message={t('errors:serverError')} />
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Error500
