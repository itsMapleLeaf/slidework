import React from "react"
import AnonymousApp from "./app/AnonymousApp"
import App from "./app/App"
import {
  useAnonymousAuthContext,
  useAuth,
  useRequiredAuthContext,
} from "./auth/authContext"
import AuthResource from "./auth/AuthResource"

type Props = { authResource: AuthResource }

function Root({ authResource }: Props) {
  const auth = useAuth(authResource)
  const user = auth.readUser()
  const token = auth.readToken()

  return user && token ? (
    <useRequiredAuthContext.Provider
      logOut={auth.logOut}
      user={user}
      token={token}
    >
      <App />
    </useRequiredAuthContext.Provider>
  ) : (
    <useAnonymousAuthContext.Provider
      logIn={auth.logIn}
      isPending={auth.isPending}
    >
      <AnonymousApp />
    </useAnonymousAuthContext.Provider>
  )
}

export default Root
