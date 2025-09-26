import { createSocket } from '@/lib/socket-io/socket-io'
import { useEffect, useMemo } from 'react'
import { toast } from 'sonner'
import { FlowContext } from './flow.context'

interface FlowProviderProps {
  children: React.ReactNode
}

export function FlowProvider({ children }: FlowProviderProps) {
  const socket = useMemo(() => {
    return createSocket()
  }, [])

  useEffect(() => {
    socket.connect()

    socket.on('exception', (data) => {
      console.error(data)
      toast.error(data.message || data.name, {
        description: data.error || data.errors,
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const flowContextMemo = useMemo(() => {
    return {
      socket,
    }
  }, [])

  return (
    <FlowContext.Provider value={flowContextMemo}>
      {children}
    </FlowContext.Provider>
  )
}
