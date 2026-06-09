import beeMartDesktop from '../assets/bee-mart-desktop.png'
import nimalDesktop from '../assets/Nimalsafari-desktop.jpg'
import realsoulDesktop from '../assets/realsoul-photography-desktop.jpg'
import safebusDesktop from '../assets/safebus-desktop.jpg'
import technicalExperts from '../assets/Technical-experts.jpg'
import tracksafeMobile from '../assets/tracksafe365-mobile.png'

export type Service = {
  number: string
  name: string
  detail: string
  image: string
  imageAlt: string
}

export const services: Service[] = [
  {
    number: '01',
    name: 'Web design & Development',
    detail:
      'Custom websites and web apps with React, Node.js, and cloud backends—designed for performance, accessibility, and growth from day one.',
    image: nimalDesktop,
    imageAlt: 'Web design and development project preview',
  },
  {
    number: '02',
    name: 'Mobile Application design & Development',
    detail:
      'Native-feel mobile experiences for iOS and Android with polished UI, offline support, and APIs built to scale with your users.',
    image: tracksafeMobile,
    imageAlt: 'Mobile application design and development preview',
  },
  {
    number: '03',
    name: 'Management Syetem Development',
    detail:
      'ERP, CRM, and internal tools that streamline operations—with role-based access, reporting dashboards, and workflows your team actually uses.',
    image: safebusDesktop,
    imageAlt: 'Management system development project preview',
  },
  {
    number: '04',
    name: 'IT & Digital Solutions',
    detail:
      'Cloud migration, system integration, and digital transformation roadmaps that modernize legacy stacks without disrupting the business.',
    image: technicalExperts,
    imageAlt: 'IT and digital solutions project preview',
  },
  {
    number: '05',
    name: 'SEO',
    detail:
      'Technical SEO, content structure, and Core Web Vitals optimization so your product ranks higher and converts more organic traffic.',
    image: realsoulDesktop,
    imageAlt: 'SEO and search optimization project preview',
  },
  {
    number: '06',
    name: 'Digital Marketing',
    detail:
      'Campaign landing pages, analytics setup, and conversion-focused creative that turns visitors into leads across search and social.',
    image: beeMartDesktop,
    imageAlt: 'Digital marketing project preview',
  },
]

export const homeServices = services.slice(0, 4).map(({ number, name }) => ({
  number,
  title: name,
  to: '/services',
}))
