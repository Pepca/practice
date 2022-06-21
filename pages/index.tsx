import type { NextPage } from 'next'

import { MainLayout } from '../components/layouts/MainLayout'

import Intro from '../components/Intro'
import About from '../components/About'
import Services from '../components/Services'
import Team from '../components/Team'
import Review from '../components/Review'
import Forms from '../components/Forms'

import { WorkWithUsPopup } from '../components/Popup/WorkWithUpPopup'
import { IssuesPopup } from '../components/Popup/IssuesPopup'

const LandingPage: NextPage = () => {
  return (
    <MainLayout title='IT STUDIO'>
      <WorkWithUsPopup />
      <IssuesPopup />
      <Intro />
      <About />
      <Services />
      <Team />
      <Review />
      <Forms />
    </MainLayout>
  )
}

export default LandingPage
