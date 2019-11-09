import React from "react"

type Props = {
  placeholder: React.ReactNode
}

export default class ErrorBoundary extends React.Component<Props> {
  state = {
    hasError: false,
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError ? this.props.placeholder : this.props.children
  }
}
