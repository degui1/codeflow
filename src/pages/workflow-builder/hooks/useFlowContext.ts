import { use } from 'react'
import { FlowContext } from '../context/flow.context'

export const useFlowContext = () => {
  return use(FlowContext)
}
