import React from "react"
import { useAuth } from "./auth"

function App() {
  const auth = useAuth()
  return (
    <main>
      <button onClick={auth.logIn}>log in</button>
      <button onClick={auth.logOut}>log out</button>
      <pre>{JSON.stringify(auth.user)}</pre>
    </main>
  )
}

export default App
