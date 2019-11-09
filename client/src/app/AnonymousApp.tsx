import React from "react"

type Props = {
  onLogIn: () => void
}

export default function AnonymousApp({ onLogIn }: Props) {
  return (
    <>
      <nav>
        <button onClick={onLogIn}>log in</button>
      </nav>
      <main>
        <p>hi, please log in</p>
      </main>
    </>
  )
}
