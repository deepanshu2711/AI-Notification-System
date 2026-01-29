'use client'
import { Button } from '@/components/typescript/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/typescript/dialog'
import { Field, Label } from '@/components/typescript/fieldset'
import { Input } from '@/components/typescript/input'
import { Select } from '@/components/typescript/select'
import { Textarea } from '@/components/typescript/textarea'
import { useState } from 'react'
import { useGetProjectsQuery } from '../../../features/projects/hooks/query/useGetProjectsQuery'
import { TemplateVariable } from '../types/template'

interface CreateTemplateModalProps {
  open: boolean
  onClose: () => void
  onCreate: (templateData: {
    name: string
    channel: string
    content: {
      subject?: string
      body?: string
      message?: string
      title?: string
    }
    variables: Record<string, TemplateVariable>
    projectId: string
  }) => void
}

export function CreateTemplateModal({ open, onClose, onCreate }: CreateTemplateModalProps) {
  const [name, setName] = useState('')
  const [channel, setChannel] = useState('email')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [projectId, setProjectId] = useState('')
  const [variables, setVariables] = useState<Record<string, TemplateVariable>>({})
  const [newVariableName, setNewVariableName] = useState('')
  const [newVariableDescription, setNewVariableDescription] = useState('')
  const [newVariableRequired, setNewVariableRequired] = useState(false)
  const [newVariableExample, setNewVariableExample] = useState('')

  const { data: projects } = useGetProjectsQuery()

  const addVariable = () => {
    if (newVariableName.trim()) {
      setVariables((prev) => ({
        ...prev,
        [newVariableName]: {
          description: newVariableDescription,
          required: newVariableRequired,
          example: newVariableExample,
        },
      }))
      setNewVariableName('')
      setNewVariableDescription('')
      setNewVariableRequired(false)
      setNewVariableExample('')
    }
  }

  const removeVariable = (variableName: string) => {
    setVariables((prev) => {
      const newVars = { ...prev }
      delete newVars[variableName]
      return newVars
    })
  }

  const handleSubmit = () => {
    const content: any = {
      body,
    }

    if (channel === 'email') {
      content.subject = subject
    } else if (channel === 'push') {
      content.title = subject
    } else if (channel === 'sms' || channel === 'whatsapp') {
      content.message = body
    }

    onCreate({
      name,
      channel,
      content,
      variables,
      projectId,
    })

    setName('')
    setChannel('email')
    setSubject('')
    setBody('')
    setVariables({})
    setProjectId('')
    onClose()
  }

  const handleCancel = () => {
    setName('')
    setChannel('email')
    setSubject('')
    setBody('')
    setVariables({})
    setProjectId('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} size="5xl">
      <DialogTitle>Create New Template</DialogTitle>
      <DialogDescription>
        Design a notification template. Use double curly braces{' '}
        <code className="text-indigo-400">{'{{variable}}'}</code> to inject dynamic data.
      </DialogDescription>

      <DialogBody className="space-y-4">
        {/* Top Section: Name & Metadata */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field>
            <Label>Template Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Order Confirmation" />
          </Field>

          <div className="flex gap-4">
            <Field className="flex-1">
              <Label>Project</Label>
              <Select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                <option value="">Select project...</option>
                {projects?.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field className="w-1/3">
              <Label>Channel</Label>
              <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
                <option value="email">Email</option>
              </Select>
            </Field>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Content Section */}
        <div className="space-y-4">
          {(channel === 'email' || channel === 'push') && (
            <Field>
              <Label>{channel === 'email' ? 'Subject Line' : 'Notification Title'}</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={`e.g., Hello {{userName}}!`}
              />
            </Field>
          )}

          <Field>
            <Label>{channel === 'email' ? 'Email Body' : 'Message Content'}</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              className="font-mono text-sm" // Mono helps distinguish variables
            />
          </Field>
        </div>

        {/* Variables Section */}
        <div className="rounded-2xl bg-gray-900/50 p-6 ring-1 ring-white/10">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Dynamic Variables</h4>
              <p className="text-xs text-gray-500">Define the data fields this template requires.</p>
            </div>
          </header>

          {/* Existing Variables List */}
          <div className="mb-6 space-y-2">
            {Object.entries(variables).map(([varName, varData]) => (
              <div
                key={varName}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4 py-3"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-indigo-400">
                    {'{{'}
                    {varName}
                    {'}}'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {varData.description} • <span className="italic">Ex: {varData.example}</span>
                  </span>
                </div>
                <Button
                  outline
                  onClick={() => removeVariable(varName)}
                  className="!px-2 !py-1 text-xs hover:bg-red-500/10"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Add New Variable Form - Visualized as a 'Sub-card' */}
          <div className="grid grid-cols-1 gap-4 rounded-xl bg-white/5 p-4 md:grid-cols-2">
            <Field>
              <Label className="text-[10px] tracking-wider text-gray-500 uppercase">Variable Name</Label>
              <Input
                value={newVariableName}
                onChange={(e) => setNewVariableName(e.target.value)}
                placeholder="userName"
                className="sm:text-sm"
              />
            </Field>
            <Field>
              <Label className="text-[10px] tracking-wider text-gray-500 uppercase">Example Value</Label>
              <Input
                value={newVariableExample}
                onChange={(e) => setNewVariableExample(e.target.value)}
                placeholder="John Doe"
                className="sm:text-sm"
              />
            </Field>
            <Field className="md:col-span-2">
              <Label className="text-[10px] tracking-wider text-gray-500 uppercase">Description</Label>
              <Input
                value={newVariableDescription}
                onChange={(e) => setNewVariableDescription(e.target.value)}
                placeholder="The full name of the user"
                className="sm:text-sm"
              />
            </Field>
            <div className="flex items-center justify-between pt-2 md:col-span-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={newVariableRequired}
                  onChange={(e) => setNewVariableRequired(e.target.checked)}
                  className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-300">Mark as required</span>
              </label>
              <Button
                onClick={addVariable}
                disabled={!newVariableName.trim()}
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Add Field
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>

      <DialogActions>
        <Button outline onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!name || !body || !projectId}
          className="bg-white text-black hover:bg-gray-200"
        >
          Create Template
        </Button>
      </DialogActions>
    </Dialog>
  )
}
