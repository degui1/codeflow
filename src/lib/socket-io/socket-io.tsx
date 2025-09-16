import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL

export const createSocket = () =>
  io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
    // timeout: 5000,
  })
