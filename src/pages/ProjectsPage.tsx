import { useState } from 'react'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectFilters } from '../components/projects/ProjectFilters'
import { SectionContainer } from '../components/ui/SectionContainer'
import { SectionHeader } from '../components/ui/SectionHeader'
import { filterProjects, type ProjectFilter } from '../data/projects'

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All')
  const filteredProjects = filterProjects(activeFilter)

  return (
    <div className="section-stack">
      <section className="w-full bg-white">
        <SectionContainer className="pb-8 lg:pb-12">
          <div className="bento-stack">
            <div>
              <ProjectFilters active={activeFilter} onChange={setActiveFilter} />
            </div>

            <SectionHeader
              heading="h1"
              titleClassName="max-w-4xl text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
              title={
                <>
                  Crafting works
                  <br />
                  that stand out
                </>
              }
              description="Navigating a digital landscape tailored to diverse industries, we specialize in crafting innovative solutions that drive success in your indusrty. Let's explore the Our client portafolio."
            />

            <div className="card-grid grid w-full grid-cols-1 items-stretch md:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <p className="py-16 text-center text-muted">No projects found in this category.</p>
            )}
          </div>
        </SectionContainer>
      </section>
    </div>
  )
}
