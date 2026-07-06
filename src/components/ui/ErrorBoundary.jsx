import { Component } from 'react';
import { ButtonLink } from './ButtonLink';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-light px-4">
          <div className="surface max-w-lg rounded-lg p-8 text-center">
            <h1 className="font-heading text-3xl font-bold text-ink">Something needs attention</h1>
            <p className="mt-3 text-muted">Please refresh the page or return home.</p>
            <ButtonLink href="/" className="mt-6">
              Go Home
            </ButtonLink>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}







