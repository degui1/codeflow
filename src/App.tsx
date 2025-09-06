import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { RouterProvider } from 'react-router'
import { routes } from './routes/routes.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useAuthChecker } from './hooks/useAuthChecker.ts'
import { useEffect } from 'react'

export function App() {
  const { AuthChecker } = useAuthChecker()

  useEffect(() => {
    AuthChecker()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}
