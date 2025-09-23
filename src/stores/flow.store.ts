import { create } from 'zustand'

type FlowStore = {
  flowSchemaId: string
  setFlowSchemaId: (schemaId: string) => void
}

export const flowStore = create<FlowStore>((set) => ({
  flowSchemaId: '',
  setFlowSchemaId(schemaId: string) {
    set({ flowSchemaId: schemaId })
  },
}))
