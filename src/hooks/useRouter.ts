import { ROUTES_PATHS } from '@/routes/paths'
import { NavigateOptions, useNavigate } from 'react-router'

export const useRouter = () => {
  const navigateDefault = useNavigate()

  const navigate = (
    path: keyof typeof ROUTES_PATHS,
    options?: Omit<NavigateOptions, 'viewTransition'>,
  ) => {
    navigateDefault(ROUTES_PATHS[path], {
      viewTransition: true,
      ...options,
    })
  }

  return { navigate }
}
