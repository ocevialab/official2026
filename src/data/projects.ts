import technicalExperts from '../assets/Technical-experts.jpg'
import beeMartDesktop from '../assets/bee-mart-desktop.png'
import nimalDesktop from '../assets/Nimalsafari-desktop.jpg'
import nimalMobile from '../assets/Nimalsafari-mobile.jpg'
import nimalDetail from '../assets/project_details_Nimalsafari.jpg'
import realsoulDesktop from '../assets/realsoul-photography-desktop.jpg'
import realsoulMobile from '../assets/realsoul-photography-mobile.jpg'
import realsoulDetail from '../assets/project_details_realsoul-photography.jpeg'
import safebusDesktop from '../assets/safebus-desktop.jpg'
import safebusDetail from '../assets/project_details_safebus.jpg'
import tracksafeMobile from '../assets/tracksafe365-mobile.png'

export const projectFilters = [
  'All',
  'Web Design',
  'UI/UX Design',
  'Mobile Apps',
  'Logo Design',
] as const

export type ProjectFilter = (typeof projectFilters)[number]

export type ProjectCategory = Exclude<ProjectFilter, 'All'>

export type ProjectImages = {
  desktop: string
  mobile: string
  detail: string
}

export type Project = {
  slug: string
  title: string
  tags: string[]
  categories: ProjectCategory[]
  description: string
  images: ProjectImages
  longDescription: string[]
  info: {
    category: string
    location: string
    dated: string
  }
  previewUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'Nimal-safari',
    title: 'Nimal Safari',
    tags: ['Web Development', 'Digital Design'],
    categories: ['Web Design'],
    description:
      'We partnered with **Nimal Safari**, a premier safari agency in Sri Lanka, to design and develop a custom web application.',
    images: {
      desktop: nimalDesktop,
      mobile: nimalMobile,
      detail: nimalDetail,
    },
    longDescription: [
      'We partnered with **Nimal Safari**, a premier safari agency in Sri Lanka, to design and develop a custom **web application**. The goal was to capture the excitement of a safari with an attractive, modern design and exceptionally smooth animations. We utilized modern technologies to build a platform that is both visually engaging and highly functional, providing an intuitive experience for users booking their next adventure.',
      'Beyond the aesthetics, our development process was heavily focused on long-term performance and visibility. We implemented a comprehensive SEO strategy from the ground up to ensure Nimal Safari ranks prominently in search results. Core web vitals and performance optimization were a top priority, resulting in a fast, responsive, and reliable web application that delivers measurable results.',
    ],
    info: {
      category: 'Web Application Design & Development',
      location: 'Sri Lanka',
      dated: '12-Jan-2025',
    },
    previewUrl: 'https://nimalsafari.com/',
  },
  {
    slug: 'technical-experts-service',
    title: 'Technical Experts Service',
    tags: ['UI / UX Design', 'Frontend Development'],
    categories: ['Web Design', 'UI/UX Design'],
    description:
      'We delivered UI/UX design and frontend development for Technical Experts Service, creating a modern, professional web experience for their maintenance and technical services.',
    images: {
      desktop: technicalExperts,
      mobile: technicalExperts,
      detail: technicalExperts,
    },
    longDescription: [
      'We partnered with **Technical Experts Service** to design and build a polished digital presence for their maintenance and technical services business. Our work covered the full **UI/UX design** process—from wireframes and visual design through to a responsive, production-ready **frontend** implementation.',
      'The result is a clean, trustworthy interface that communicates professionalism at a glance, guides visitors to key services, and performs smoothly across desktop and mobile devices.',
    ],
    info: {
      category: 'UI/UX Design & Frontend Development',
      location: 'Sri Lanka',
      dated: '10-Apr-2025',
    },
  },
  {
    slug: 'realsoul-photography',
    title: 'RealSoul Photography',
    tags: ['Web Development', 'Digital Design'],
    categories: ['Web Design', 'Logo Design'],
    description:
      'We collaborated with RealSoul Photography, an Australian photographer, to design and develop a website that brings their creative ideas to life.',
    images: {
      desktop: realsoulDesktop,
      mobile: realsoulMobile,
      detail: realsoulDetail,
    },
    longDescription: [
      'We had the privilege of collaborating with RealSoul Photography, an Australian photographer, to design and develop a website that brings their creative ideas to life. We focused on translating the clients vision into a tangible digital experience, incorporating modern technology and current design trends to build a site that was exactly what they requested.',
      'Our development process prioritized technical excellence. We implemented a comprehensive SEO strategy to ensure high visibility and built smooth, captivating animations to engage users. The final website is fully optimized for the best performance, delivering a fast and seamless experience across all different devices and operating systems.',
    ],
    info: {
      category: 'Web Design & Brand Portfolio',
      location: 'Australia',
      dated: '18-Jun-2024',
    },
    previewUrl: 'https://real-soul-next.vercel.app/',
  },
  {
    slug: 'safebus',
    title: 'SafeBus',
    tags: ['UI / UX Design', 'Mobile Apps'],
    categories: ['Mobile Apps', 'UI/UX Design'],
    description:
      'Our team conceptualized, designed, and developed BusSafe, a mobile application focused on enhancing safety for child school transport services.',
    images: {
      desktop: safebusDesktop,
      mobile: safebusDesktop,
      detail: safebusDetail,
    },
    longDescription: [
      'Our team conceptualized, designed, and developed "BusSafe," a comprehensive mobile application focused on enhancing safety for child school transport services. We were responsible for the entire project, including building the complete brand and identity from scratch to establish a sense of trust and reliability with users.',
      'The app serves as a dedicated safety system, providing peace of mind to parents and schools. We engineered the application with a user-friendly design and robust technology to ensure dependable monitoring. The final product is a seamless, all-in-one solution that prioritizes the safety and well-being of children during their commute.',
    ],
    info: {
      category: 'Mobile Application Design & Development',
      location: 'Sri Lanka',
      dated: '22-Sep-2024',
    },
    previewUrl:
      'https://www.figma.com/design/wNlLBTeXB71vOxMUMboPHH/safe?node-id=0-1&t=2xxmdAYe9h5gxvTQ-1',
  },
  {
    slug: 'bee-mart',
    title: 'Bee Mart',
    tags: ['UI / UX Design', 'Web Development'],
    categories: ['Web Design', 'UI/UX Design'],
    description:
      'We designed Bee Mart as a unique e-commerce web application for selling traditional Sri Lankan snacks.',
    images: {
      desktop: beeMartDesktop,
      mobile: beeMartDesktop,
      detail: beeMartDesktop,
    },
    longDescription: [
      'We designed Bee Mart as a unique e-commerce web application for selling traditional Sri Lankan snacks. The design phase, which is now complete, focused on an "uncommon" and engaging layout that sets it apart from typical online stores, creating a memorable brand experience.',
      'The project has now moved into the development phase. Our team is actively working to build the application, translating the custom design into a fully functional and responsive e-commerce platform, with development currently in progress.',
    ],
    info: {
      category: 'E-commerce Web Application',
      location: 'Sri Lanka',
      dated: '05-Mar-2025',
    },
    previewUrl:
      'https://www.figma.com/design/lXb7jScen47FyosvELtdFb/bee-mart?node-id=0-1&t=luxTTAYOFGA5QzwH-1',
  },
  {
    slug: 'tracksafe365',
    title: 'TRACKSAFE365',
    tags: ['UI / UX Design', 'Mobile Apps'],
    categories: ['Mobile Apps', 'UI/UX Design'],
    description:
      'We designed and developed TRACKSAFE365, a bespoke mobile application built to connect a physiotherapist directly with her patients.',
    images: {
      desktop: tracksafeMobile,
      mobile: tracksafeMobile,
      detail: tracksafeMobile,
    },
    longDescription: [
      'We designed and developed TRACKSAFE365, a bespoke mobile application built to connect a physiotherapist directly with her patients. The primary goal was to create a modern, intuitive platform that facilitates seamless communication, remote monitoring, and enhances the therapeutic relationship outside of the clinic.',
      'Our team focused heavily on the user experience, implementing modern design trends to create an interface that is clean, accessible, and easy for patients to navigate. The application provides a direct and secure channel for the physiotherapist to share exercise plans, track progress, and stay connected, ultimately improving patient engagement and outcomes.',
    ],
    info: {
      category: 'Mobile Application Design & Development',
      location: 'Australia',
      dated: '14-Nov-2024',
    },
    previewUrl:
      'https://www.figma.com/design/wNlLBTeXB71vOxMUMboPHH/safe?node-id=0-1&t=2xxmdAYe9h5gxvTQ-1',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function filterProjects(filter: ProjectFilter): Project[] {
  if (filter === 'All') return projects
  return projects.filter((project) => project.categories.includes(filter))
}

/** Featured projects for the home page bento grid */
export const homeBentoProjects = {
  tall: projects.find((p) => p.slug === 'technical-experts-service')!,
  feature: projects.find((p) => p.slug === 'Nimal-safari')!,
  compact: [
    projects.find((p) => p.slug === 'bee-mart')!,
    projects.find((p) => p.slug === 'tracksafe365')!,
  ],
} as const
