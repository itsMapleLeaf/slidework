/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />
import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import ErrorBoundary from "./app/ErrorBoundary"
import AuthResource from "./auth/AuthResource"
import { useAuthContext } from "./auth/useAuthContext"
import Root from "./Root"

const authResource = new AuthResource()

const authErrorMessage = <p>an error occurred, please refresh and try again!</p>

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <useAuthContext.Provider resource={authResource}>
      <Suspense fallback={<p>loading...</p>}>
        <ErrorBoundary placeholder={authErrorMessage}>
          <Root />
        </ErrorBoundary>
      </Suspense>
    </useAuthContext.Provider>
  </BrowserRouter>,
)
