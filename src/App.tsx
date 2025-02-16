import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './pages/home.tsx'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
