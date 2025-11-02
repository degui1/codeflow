import { MarkdownVisualizer } from '../MarkdownVisualizer'
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { FlowCodePreview } from '../workflow-builder/FlowCodePreview'

interface FlowVisualizerProps {
  open: boolean
  onClose: VoidFunction
  code: string
  title: string
  content: string
}

export function FlowVisualizer({
  open,
  onClose,
  title,
  code,
  content,
}: FlowVisualizerProps) {
  return (
    <Dialog modal open={open} onOpenChange={onClose}>
      <DialogContent className="flex h-[80%] flex-col md:w-full md:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[90%] flex-1 flex-col space-x-4 overflow-y-auto lg:flex-row">
          <ScrollArea className="w-full rounded-md p-10">
            <MarkdownVisualizer source={content} />
          </ScrollArea>

          <FlowCodePreview yamlCode={code} isPreview />
        </div>
      </DialogContent>
    </Dialog>
  )
}
