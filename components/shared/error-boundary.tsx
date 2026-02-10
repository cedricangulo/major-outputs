"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-50 p-6 border border-destructive/20 rounded-lg bg-destructive/5">
          <AlertTriangle className="size-8 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
            An unexpected error occurred. This has been logged and we're working
            to fix it.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="flex items-center gap-2"
          >
            <RefreshCw className="size-4" />
            Try again
          </Button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-4 text-xs text-muted-foreground">
              <summary className="cursor-pointer">
                Error details (dev only)
              </summary>
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-w-full">
                {this.state.error.message}
                {"\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
