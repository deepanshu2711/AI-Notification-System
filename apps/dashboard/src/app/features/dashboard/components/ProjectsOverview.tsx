import { Text } from '@/components/elements/text'
import { Badge } from '@/components/typescript/badge'
import { Subheading } from '@/components/typescript/heading'

interface Project {
  id: string
  name: string
  totalNotifications: number
  deliveryRate: number
  activeTemplates: number
}

const dummyProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce App',
    totalNotifications: 15420,
    deliveryRate: 98.5,
    activeTemplates: 5,
  },
  {
    id: '2',
    name: 'Marketing Campaign',
    totalNotifications: 8750,
    deliveryRate: 95.2,
    activeTemplates: 3,
  },
  {
    id: '3',
    name: 'User Onboarding',
    totalNotifications: 3200,
    deliveryRate: 99.1,
    activeTemplates: 2,
  },
  {
    id: '4',
    name: 'Support System',
    totalNotifications: 6200,
    deliveryRate: 97.8,
    activeTemplates: 4,
  },
]

export function ProjectsOverview() {
  return (
    <div className="space-y-4">
      <Subheading className="text-lg font-semibold">Projects Overview</Subheading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {dummyProjects.map((project) => (
          <div key={project.id} className="rounded-lg border border-gray-500 p-4 transition-colors hover:bg-gray-50/1">
            <div className="mb-2 flex items-start justify-between">
              <Text className="font-medium">{project.name}</Text>
              <Badge color="sky">Active</Badge>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div>Total Notifications: {project.totalNotifications.toLocaleString()}</div>
              <div>Delivery Rate: {project.deliveryRate}%</div>
              <div>Active Templates: {project.activeTemplates}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
