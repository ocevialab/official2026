import { AboutApart } from '../components/about/AboutApart'
import { AboutHero } from '../components/about/AboutHero'
import { AboutMission } from '../components/about/AboutMission'
import { AboutVisionMission } from '../components/about/AboutVisionMission'
import { AboutWhoWeAre } from '../components/about/AboutWhoWeAre'

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutWhoWeAre />
      <AboutVisionMission />
      <AboutMission />
      <AboutApart />
    </>
  )
}
