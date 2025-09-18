import { createBrowserRouter } from 'react-router'
import { CoreLayout } from '../layouts/core/index.tsx'
import { Home } from '../pages/home/home.tsx'
import { ROUTES_PATHS } from './paths.ts'
import { RouteGuard } from '@/components/RouteGuard.tsx'
import { authStore } from '@/stores/authStore.ts'

export const routes = createBrowserRouter([
  {
    path: ROUTES_PATHS.HOME,
    element: <CoreLayout />,
    loader: async () => {
      await authStore.getState().getIsAuthenticated()
    },
    errorElement: <RouteGuard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES_PATHS.COMMUNITY,
        lazy: async () => {
          const Component = await import('../pages/community/community.tsx')

          return { Component: Component.Community }
        },
      },
      {
        path: ROUTES_PATHS.WORKFLOW_BUILDER,
        lazy: async () => {
          const Component = await import(
            '../pages/workflow-builder/workflow-builder.tsx'
          )

          return { Component: Component.WorkflowBuilder }
        },
      },
      {
        path: ROUTES_PATHS.PROFILE,
        lazy: async () => {
          const Component = await import('../pages/profile/profile.tsx')

          return { Component: Component.Profile }
        },
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const Component = await import('../components/NotFound.tsx')

      return { Component: Component.NotFound }
    },
  },
])
