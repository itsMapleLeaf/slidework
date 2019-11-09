import React from "react"
import { AuthUser } from "../auth/types"

type Props = {
  user: AuthUser
  onLogOut: () => void
}

export default function App({ user, onLogOut }: Props) {
  return (
    <>
      <nav>
        <button onClick={onLogOut}>log out</button>
      </nav>
      <main>
        <pre>{JSON.stringify(user, undefined, 2)}</pre>
      </main>
    </>
  )
}
