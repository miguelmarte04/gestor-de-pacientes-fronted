import React from 'react'
import CustomErrorPage from './components/CustomErrorPage'

interface Props {
  children: React.ReactNode
}

interface StateProps {
  hasError: boolean
  error: string | Record<string, unknown>
  errorInfo: string | Record<string, unknown>
}

export class ErrorBoundary extends React.Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: '', errorInfo: '' }
  }

  static getDerivedStateFromError(): Partial<StateProps> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error?.message,
      errorInfo: errorInfo?.componentStack,
    })
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <CustomErrorPage
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
