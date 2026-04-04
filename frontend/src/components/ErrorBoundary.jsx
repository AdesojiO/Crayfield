import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(err, info) {
    console.error('Uncaught error:', err, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">Please refresh the page or return to the homepage.</p>
          <a href="/" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
            Back to Home
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
