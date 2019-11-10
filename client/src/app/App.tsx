import React, { Suspense } from "react"
import { useAuthContext } from "../auth/useAuthContext"
import { useTimeline } from "../http/useApi"
import ErrorBoundary from "./ErrorBoundary"

export default function App() {
  const auth = useAuthContext()
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

function Timeline() {
  const data = useTimeline()
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>
}
