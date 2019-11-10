import React from "react"
import AnonymousApp from "./app/AnonymousApp"
import App from "./app/App"
import { useAuthContext } from "./auth/useAuthContext"

function Root() {
  const auth = useAuthContext()
  const user = auth.readUser()
  return (
    <>
      {user ? (
        <App onLogOut={auth.logOut} />
      ) : (
        <AnonymousApp onLogIn={auth.logIn} />
      )}
    </>
  )
}

export default Root
