import React from 'react'
import { ErrorBoundary } from './error-boundary'

interface SafeSuspenseProps {
  children: React.ReactNode
  fallback: React.ReactNode
  renderOnError?: React.ReactNode
}

export function SafeSuspense({
  children,
  fallback,
  renderOnError,
}: SafeSuspenseProps) {
  return (
    <ErrorBoundary renderOnError={renderOnError}>
      <React.Suspense fallback={fallback}>{children}</React.Suspense>
    </ErrorBoundary>
  )
}
