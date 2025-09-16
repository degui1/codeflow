import { EmitterEvents, ListenerEvents } from '@/lib/socket-io/events'
import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export interface IFlowContext {
  socket: Socket<ListenerEvents, EmitterEvents>
}

export const FlowContext = createContext({} as IFlowContext)
