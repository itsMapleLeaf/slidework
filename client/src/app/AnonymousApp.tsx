import React from "react"
import { useAnonymousAuthContext } from "../auth/authContext"

export default function AnonymousApp() {
  const auth = useAnonymousAuthContext()
  return (
    <>
      <nav>
        <button onClick={auth.logIn} disabled={auth.isPending}>
          {auth.isPending ? "logging in..." : "log in"}
        </button>
      </nav>
      <main>
        <p>hi, please log in</p>
      </main>
    </>
  )
}
