import React, { useState } from "react"
import { useAuth } from "./auth"

async function fetchJson(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  return response.json()
}

function App() {
  const auth = useAuth()
  const [secret, setSecret] = useState<any>()

  async function getSecret() {
    const token = await auth.getTokenSilently()

    const result = await fetchJson(`/api/timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setSecret(result)
  }

  return (
    <main>
      <button onClick={auth.logIn}>log in</button>
      <button onClick={auth.logOut}>log out</button>
      <button onClick={getSecret}>get the secret</button>
      <pre>{JSON.stringify(auth.user, undefined, 2)}</pre>
      <pre>{JSON.stringify(secret, undefined, 2)}</pre>
    </main>
  )
}

export default App
