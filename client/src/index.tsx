/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />
import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import ErrorBoundary from "./app/ErrorBoundary"
import LandingPage from "./app/LandingPage"
import AuthResource from "./auth/AuthResource"
import AuthRoot from "./auth/AuthRoot"
import TimelinePage from "./timeline/TimelinePage"

const authResource = new AuthResource()

const authErrorMessage = <p>an error occurred, please refresh and try again!</p>

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<p>loading...</p>}>
      <ErrorBoundary placeholder={authErrorMessage}>
        <AuthRoot
          authResource={authResource}
          publicContent={<LandingPage />}
          protectedContent={<TimelinePage />}
        />
      </ErrorBoundary>
    </Suspense>
  </BrowserRouter>,
)
