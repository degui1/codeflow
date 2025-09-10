import { FlowCodePreview } from '@/components/workflow-builder/FlowCodePreview'
import { FlowProvider } from './context/flow.provider'
import { FlowForm } from './components/Form/FlowForm'

export function WorkflowBuilder() {
  return (
    <FlowProvider>
      <main className="flex w-full max-w-[1200px] flex-1 justify-center self-center">
        <FlowForm />

        <FlowCodePreview
          yamlCode={
            'name: GitHub Actions\non:  ["pull", "push"]\njobs:\n\truns-on: "ubunto"'
          }
        />
      </main>
    </FlowProvider>
  )
}
