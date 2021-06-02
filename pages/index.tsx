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

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head />

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
