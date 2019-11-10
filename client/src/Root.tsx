import React, { useState } from "react"
import AnonymousApp from "./app/AnonymousApp"
import App from "./app/App"
import AuthResource from "./auth/AuthResource"

type Props = {
  authResource: AuthResource
}

function Root({ authResource: initialAuthResource }: Props) {
  const [authResource, setAuthResource] = useState(initialAuthResource)

  const user = authResource.readUser()

  const logIn = () => {
    setAuthResource(new AuthResource({ logIn: true }))
  }

  return (
    <>
      {user ? (
        <App onLogOut={authResource.logOut} />
      ) : (
        <AnonymousApp onLogIn={logIn} />
      )}
    </>
  )
}

export default Root
