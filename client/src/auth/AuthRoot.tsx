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
  return auth.state ? (
    <useRequiredAuthContext.Provider
      {...auth.state}
      logOut={auth.logOut}
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
