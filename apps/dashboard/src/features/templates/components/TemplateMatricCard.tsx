import { Text } from '@/components/elements/text'
import { Subheading } from '@/components/typescript/heading'

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
}

export function TemplateMatricCard({ title, value, subtitle }: MetricCardProps) {
  return (
    <div className="border-t border-gray-500 py-4">
      <div className="flex flex-col space-y-2">
        <Text className="text-sm text-gray-600">{title}</Text>
        <div className="flex items-center space-x-2">
          <Subheading level={2} className="text-2xl font-bold">
            {value}
          </Subheading>
        </div>
        <Text className="text-xs text-gray-500">{subtitle}</Text>
      </div>
    </div>
  )
}
