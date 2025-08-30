import { createBrowserRouter } from 'react-router'
import { CoreLayout } from '../layouts/core/index.tsx'
import { Home } from '../pages/home/home.tsx'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <CoreLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'community',
        lazy: async () => {
          const Component = await import('../pages/community/community.tsx')

          return { Component: Component.Community }
        },
      },
      {
        path: 'workflow-builder',
        lazy: async () => {
          const Component = await import(
            '../pages/workflow-builder/workflow-builder.tsx'
          )

          return { Component: Component.WorkflowBuilder }
        },
      },
      {
        path: 'profile',
        lazy: async () => {
          const Component = await import('../pages/profile/profile.tsx')

          return { Component: Component.Profile }
        },
      },
    ],
  },
])
