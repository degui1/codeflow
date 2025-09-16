import { FlowProvider } from './context/flow.provider'
import { FlowForm } from './components/Form/FlowForm'
import { FlowEditor } from './components/FlowEditor/FlowEditor'

export function WorkflowBuilder() {
  return (
    <FlowProvider>
      <main className="flex w-full max-w-[1200px] flex-1 justify-center space-x-6 self-center">
        <FlowForm />

        <FlowEditor />
      </main>
    </FlowProvider>
  )
}
