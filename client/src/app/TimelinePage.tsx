import React, { Suspense } from "react"
import { useRequiredAuthContext } from "../auth/authContext"
import { useTimeline } from "../http/useApi"
import ErrorBoundary from "./ErrorBoundary"

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

function Timeline() {
  const data = useTimeline()
  return (
    <>
      {data.media.map((media) => (
        <img
          key={media.id}
          src={media.url}
          alt=""
          role="presentation"
          width={800}
        />
      ))}
    </>
  )
}
