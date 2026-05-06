import { Component } from 'react'
import Button from './Button'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen items-center justify-center p-6">
          <section className="max-w-xl rounded-4xl border border-danger/40 bg-danger-soft p-8 text-danger shadow-card">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em]">Application error</p>
            <h1 className="mt-3 font-display text-3xl font-bold">Something broke in the UI.</h1>
            <p className="mt-3 text-sm font-semibold">{this.state.error.message}</p>
            <Button className="mt-6" onClick={() => window.location.reload()} variant="danger">
              Reload
            </Button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}
