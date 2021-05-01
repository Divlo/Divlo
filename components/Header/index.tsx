import Link from 'next/link'
import Image from 'next/image'

import { Language } from './Language'
import { SwitchTheme } from './SwitchTheme'

export const Header: React.FC = () => {
  return (
    <header className='bg-white sticky top-0 z-50 flex w-full justify-between px-6 py-2 border-b-2 border-gray-600 dark:border-gray-400 dark:bg-black'>
      <Link href='/'>
        <a>
          <div className='flex items-center justify-center'>
            <Image
              width={60}
              height={60}
              src='/images/divlo_icon_small.png'
              alt='Divlo'
            />
            <strong className='ml-1 font-headline font-semibold hidden sm:block'>
              Divlo
            </strong>
          </div>
        </a>
      </Link>
      <div className='flex justify-between'>
        <Language />
        <SwitchTheme />
      </div>
    </header>
  )
}
