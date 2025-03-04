import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { RouterProvider } from 'react-router'
import { routes } from './routes/routes.tsx'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}
