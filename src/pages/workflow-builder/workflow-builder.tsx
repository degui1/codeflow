import { FlowProvider } from './context/flow.provider'
import { FlowForm } from './components/Form/FlowForm'
import { FlowEditor } from './components/FlowEditor/FlowEditor'

export function WorkflowBuilder() {
  return (
    <FlowProvider>
      <main className="flex w-full max-w-[1200px] flex-1 flex-col-reverse justify-center gap-10 space-x-6 self-center md:flex-row md:gap-0">
        <FlowForm />

        <FlowEditor />
      </main>
    </FlowProvider>
  )
}
