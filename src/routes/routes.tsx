import { createBrowserRouter } from 'react-router'
import { CoreLayout } from '../layouts/core/index.tsx'
import { Home } from '../pages/home/home.tsx'
import { apiCall } from '@/api/api-client.ts'
import { userSchema } from '@/schemas/UserSchema.ts'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <CoreLayout />,
    loader: async () => {
      const response = await apiCall('GET', '/user')
      const json = await response.json()
      if (json != undefined) {
        const { success, data, error } = userSchema.safeParse(json)
        if (error) {
          console.log(error)
        }
        if (!success) return undefined
        return data.response
      }
    },
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
