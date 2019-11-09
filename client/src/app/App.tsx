import React, { Suspense } from "react"
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
        <Suspense fallback={<p>Loading timeline...</p>}>
          <Timeline />
        </Suspense>
      </main>
    </>
  )
}

function Timeline() {
  const data = useTimeline()
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>
}
