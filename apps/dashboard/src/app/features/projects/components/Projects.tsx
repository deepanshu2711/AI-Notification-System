import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Subheading } from '@/components/typescript/heading'
import { ProjectsOverview } from './ProjectsOverview'

export default function Projects() {
  return (
    <Container className="flex flex-col gap-10">
      <div>
        <Eyebrow>Manage</Eyebrow>
        <Heading>Projects</Heading>
        <Subheading level={2}>Create and manage your notification projects</Subheading>
      </div>
      <ProjectsOverview />
    </Container>
  )
}
