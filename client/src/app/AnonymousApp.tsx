import React from "react"
import { useAuthContext } from "../auth/useAuthContext"

export default function AnonymousApp() {
  const auth = useAuthContext()
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
