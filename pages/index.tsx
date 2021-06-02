import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { RevealFade } from 'components/design/RevealFade'
import { Section } from 'components/design/Section'
import { Head } from 'components/Head'
import { Interests } from 'components/Interests'
import { Portfolio } from 'components/Portfolio'
import { Profile } from 'components/Profile'
import { SocialMediaList } from 'components/Profile/SocialMediaList'
import { Skills } from 'components/Skills'
import { Main } from 'components/design/Main'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head />

      <Header showLanguages />
      <Main className='md:mx-auto md:max-w-4xl lg:max-w-7xl'>
        <Section isMain id='about'>
          <Profile />
          <SocialMediaList />
        </Section>

        <RevealFade>
          <Section id='interests' heading={t('home:interests.title')}>
            <Interests />
          </Section>
        </RevealFade>

        <RevealFade>
          <Section
            id='skills'
            heading={t('home:skills.title')}
            withoutShadowContainer
          >
            <Skills />
          </Section>
        </RevealFade>

        <RevealFade>
          <Section
            id='portfolio'
            heading={t('home:portfolio.title')}
            withoutShadowContainer
          >
            <Portfolio />
          </Section>
        </RevealFade>
      </Main>
      <Footer />

      <style jsx global>
        {`
          #__next {
            display: block;
          }
        `}
      </style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Home
