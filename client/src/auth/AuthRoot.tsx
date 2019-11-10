import React from "react"
import { useAnonymousAuthContext, useRequiredAuthContext } from "./authContext"
import AuthResource from "./AuthResource"
import useAuth from "./useAuth"

type Props = {
  authResource: AuthResource
  protectedContent: React.ReactNode
  publicContent: React.ReactNode
}

function AuthRoot({ authResource, protectedContent, publicContent }: Props) {
  const auth = useAuth(authResource)
  const user = auth.readUser()
  const token = auth.readToken()

  return user && token ? (
    <useRequiredAuthContext.Provider
      logOut={auth.logOut}
      user={user}
      token={token}
      children={protectedContent}
    />
  ) : (
    <useAnonymousAuthContext.Provider
      logIn={auth.logIn}
      isPending={auth.isPending}
      children={publicContent}
    />
  )
}

export default AuthRoot
