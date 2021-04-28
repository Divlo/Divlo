import useTranslation from 'next-translate/useTranslation'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className='bg-white flex justify-center py-6 text-lg border-t-2 border-gray-600 dark:border-gray-400 dark:bg-black'>
      <p>
        <span className='text-yellow'>Divlo</span> |{' '}
        {t('common:allRightsReserved')}
      </p>
    </footer>
  )
}
