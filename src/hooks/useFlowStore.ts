import { useShallow } from 'zustand/react/shallow'

import { flowStore } from '@/stores/flow.store'

export const useFlowStore = () => {
  const { flowSchemaId, setFlowSchemaId } = flowStore(
    useShallow((state) => ({
      flowSchemaId: state.flowSchemaId,
      setFlowSchemaId: state.setFlowSchemaId,
    })),
  )

  return {
    flowSchemaId,
    setFlowSchemaId,
  }
}
