import { ROUTES_PATHS } from '@/routes/paths'
import { useNavigate } from 'react-router'

export const useRouter = () => {
  const navigateDefault = useNavigate()

  const navigate = (path: keyof typeof ROUTES_PATHS) => {
    navigateDefault(path, {
      viewTransition: true,
    })
  }

  return { navigate }
}
