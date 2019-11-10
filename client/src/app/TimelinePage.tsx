import React, { Suspense, useState } from "react"
import { useRequiredAuthContext } from "../auth/authContext"
import { useTimeline } from "../http/useTimeline"
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

function Timeline({ cursor }: { cursor?: number }) {
  const data = useTimeline(cursor)
  const [renderNext, setRenderNext] = useState(false)
  return (
    <>
      <section>
        {data.media.map((media) => (
          <img
            key={media.id}
            src={media.url}
            alt=""
            role="presentation"
            width={100}
          />
        ))}
      </section>
      {renderNext ? (
        <Suspense fallback={<p>loading next page...</p>}>
          <ErrorBoundary placeholder={<p>failed to load page :(</p>}>
            <Timeline cursor={data.cursor} />
          </ErrorBoundary>
        </Suspense>
      ) : data.cursor ? (
        <button onClick={() => setRenderNext(true)}>load more</button>
      ) : null}
    </>
  )
}
