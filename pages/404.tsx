import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { ErrorPage } from 'components/ErrorPage'
import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const Error404: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head title='Divlo - 404' />

      <Header showLanguages />
      <ErrorPage statusCode={404} message={t('errors:notFound')} />
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Error404
