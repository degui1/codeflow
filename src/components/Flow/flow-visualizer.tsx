import { useQuery } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog'
import { FlowCodePreview } from '../workflow-builder/FlowCodePreview'
import { request } from '@/api/api-client'

interface FlowVisualizerProps {
  open: boolean
  onClose: VoidFunction
}

export function FlowVisualizer({ open, onClose }: FlowVisualizerProps) {
  const { data, isPending } = useQuery({
    queryKey: [],
    queryFn: async () => {
      // const resp = request('GET', '/community')

      return ''
    },
    enabled: open,
    staleTime: Infinity,
  })

  return (
    <Dialog modal open={open && !isPending} onOpenChange={onClose}>
      <DialogContent className="flex h-[80%] w-full flex-col">
        <DialogHeader>
          <DialogTitle className="text-center">test</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-1 justify-center">
          <FlowCodePreview yamlCode={''} isPreview />
        </div>
      </DialogContent>
    </Dialog>
  )
}
