'use client'
import { Button } from '@/components/typescript/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/typescript/dialog'
import { Field, Label } from '@/components/typescript/fieldset'
import { Input } from '@/components/typescript/input'
import { useState } from 'react'

interface CreateProjectModalProps {
  open: boolean
  onClose: () => void
  onCreate: (name: string, description: string) => void
}

export function CreateProjectModal({ open, onClose, onCreate }: CreateProjectModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    onCreate(name, description)
    setName('')
    setDescription('')
    onClose()
  }

  const handleCancel = () => {
    setName('')
    setDescription('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <DialogTitle>Create New Project</DialogTitle>
      <DialogDescription>
        Create a new notification project to manage your notifications and templates.
      </DialogDescription>
      <DialogBody>
        <Field>
          <Label>Project Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter project name" />
        </Field>
        <Field className="mt-4">
          <Label>Description</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
          />
        </Field>
      </DialogBody>
      <DialogActions>
        <Button outline onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create Project</Button>
      </DialogActions>
    </Dialog>
  )
}
