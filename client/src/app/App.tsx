import React from "react"
import { useTimeline } from "../http/useApi"

type Props = {
  onLogOut: () => void
}

export default function App({ onLogOut }: Props) {
  return (
    <>
      <nav>
        <button onClick={onLogOut}>log out</button>
      </nav>
      <main>
        {/* <Suspense fallback={<p>loading timeline...</p>}>
          <ErrorBoundary placeholder={<p>could not load timeline :(</p>}>
            <Timeline />
          </ErrorBoundary>
        </Suspense> */}
      </main>
    </>
  )
}

function Timeline() {
  const data = useTimeline()
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>
}
