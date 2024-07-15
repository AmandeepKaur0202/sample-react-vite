import { Component, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error("Uncaught error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (  <Result
        status="error"
        title="Something went wrong"
        subTitle="An unexpected error occurred. Please try again later."
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        }
      />)
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
