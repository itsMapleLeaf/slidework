import React, { Suspense } from "react"
import { useRequiredAuthContext } from "../auth/authContext"
import ErrorBoundary from "./ErrorBoundary"
import Timeline from "./Timeline"

export default function TimelinePage() {
  const auth = useRequiredAuthContext()

  return (
    <>
      <nav>
        <button onClick={auth.logOut}>log out</button>
      </nav>
      <main>
        <Suspense fallback={<p>loading timeline...</p>}>
          <ErrorBoundary placeholder={<p>could not load timeline :(</p>}>
            <Timeline />
          </ErrorBoundary>
        </Suspense>
      </main>
    </>
  )
}
