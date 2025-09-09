import React from 'react'

interface ErrorBoundaryStates {
  hasError: boolean
}

interface ErrorBoundaryProps {
  renderOnError?: React.ReactNode
  children?: React.ReactNode
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryStates
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.warn(React.captureOwnerStack(), error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderOnError || null
    }

    return this.props.children ?? null
  }
}
