import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export interface IFlowContext {
  socket: Socket
}

export const FlowContext = createContext({} as IFlowContext)
