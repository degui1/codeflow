import { useEffect } from 'react'
import { io } from 'socket.io-client'

export function useSocket() {
  const socket = io(import.meta.env.VITE_API_BASE_URL, {
    withCredentials: true,
  })

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  return socket
}
