import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Subheading } from '@/components/typescript/heading'
import { TemplateMatricGrid } from './TemplateMatricsGrid'
import { TemplateOverview } from './TemplateOverview'

const Templates = () => {
  return (
    <Container className="flex flex-col gap-10">
      <div>
        <Eyebrow>Manage</Eyebrow>
        <Heading>Templates</Heading>
        <Subheading level={2}>Create and manage your notification templates</Subheading>
      </div>
      <TemplateMatricGrid />
      <TemplateOverview />
    </Container>
  )
}

export default Templates
