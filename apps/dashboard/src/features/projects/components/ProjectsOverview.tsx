'use client'
import { useState } from 'react'

import { Button } from '@/components/elements/button'
import { Text } from '@/components/elements/text'
import { PlusIcon } from '@/components/icons/plus-icon'
import { Badge } from '@/components/typescript/badge'
import { Heading } from '@/components/typescript/heading'
import { useCreateProjectMutation } from '../hooks/mutation/useCreateProjectMutation'
import { useGetProjectsQuery } from '../hooks/query/useGetProjectsQuery'
import { CreateProjectModal } from './CreateProjectModal'

interface Project {
  id: string
  name: string
  totalNotifications: number
  deliveryRate: number
  activeTemplates: number
}

export function ProjectsOverview() {
  const [showModal, setShowModal] = useState(false)
  const { data } = useGetProjectsQuery()
  const { mutate: createProject } = useCreateProjectMutation()

  const handleCreateProject = (name: string, description: string) => {
    createProject({ name, description })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading>Projects Overview</Heading>
        <Button onClick={() => setShowModal(true)}>
          <PlusIcon />
          Create New Project
        </Button>
      </div>
      <CreateProjectModal open={showModal} onClose={() => setShowModal(false)} onCreate={handleCreateProject} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        {data &&
          data.map((project, idx) => (
            <div key={idx} className="border-t border-gray-500 p-4 transition-colors hover:bg-gray-50/1">
              <div className="mb-2 flex items-start justify-between">
                <Text className="">{project.name}</Text>
                <Badge color="green">Active</Badge>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Total Notifications: {3409}</div>
                <Badge color={95 > 90 ? 'lime' : 'rose'}>Delivery Rate: {95}%</Badge>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
