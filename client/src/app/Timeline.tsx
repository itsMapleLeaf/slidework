import React, { Suspense, useState } from "react"
import { useTimeline } from "../http/useTimeline"
import ErrorBoundary from "./ErrorBoundary"

type Props = {
  cursor?: number
}

export default function Timeline({ cursor }: Props) {
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
