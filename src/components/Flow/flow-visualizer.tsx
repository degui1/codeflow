import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog'
import { FlowCodePreview } from '../workflow-builder/FlowCodePreview'

interface FlowVisualizerProps {
  open: boolean
  onClose: VoidFunction
  code: string
  title: string
}

export function FlowVisualizer({
  open,
  onClose,
  title,
  code,
}: FlowVisualizerProps) {
  return (
    <Dialog modal open={open} onOpenChange={onClose}>
      <DialogContent className="flex h-[80%] w-full flex-col">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-1 justify-center">
          <FlowCodePreview yamlCode={code} isPreview />
        </div>
      </DialogContent>
    </Dialog>
  )
}
