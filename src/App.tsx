import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { RouterProvider } from 'react-router'
import { routes } from './routes/routes.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={true} />
      <Toaster />
    </QueryClientProvider>
  )
}
