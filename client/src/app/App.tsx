import React, { useEffect, useState } from "react"
import { useApi } from "../http/useApi"

type Props = {
  onLogOut: () => void
}

export default function App({ onLogOut }: Props) {
  const [data, setData] = useState<any>()
  const api = useApi()

  useEffect(() => {
    api.getTimeline().then(setData)
  }, [api])

  return (
    <>
      <nav>
        <button onClick={onLogOut}>log out</button>
      </nav>
      <main>
        {data ? (
          <pre>{JSON.stringify(data, undefined, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  )
}
