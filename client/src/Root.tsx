import React, { Suspense } from "react"
import ErrorBoundary from "./app/ErrorBoundary"
import LandingPage from "./app/LandingPage"
import AuthResource from "./auth/AuthResource"
import AuthRoot from "./auth/AuthRoot"
import TimelinePage from "./timeline/TimelinePage"

const authErrorMessage = <p>an error occurred, please refresh and try again!</p>

type Props = { authResource: AuthResource }

function Root({ authResource }: Props) {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <ErrorBoundary placeholder={authErrorMessage}>
        <AuthRoot
          authResource={authResource}
          publicContent={<LandingPage />}
          protectedContent={<TimelinePage />}
        />
      </ErrorBoundary>
    </Suspense>
  )
}

export default Root
