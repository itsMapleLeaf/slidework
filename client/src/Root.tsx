import React from "react"
import { Route } from "react-router-dom"
import AnonymousApp from "./app/AnonymousApp"
import App from "./app/App"
import AuthHandler from "./auth/AuthHandler"
import { useAuthContext } from "./auth/useAuthContext"

function Root() {
  const auth = useAuthContext()

  switch (auth.status) {
    case "init":
      return null

    case "loading":
      return <p>authenticating...</p>

    case "loaded":
      return (
        <>
          <Route exact path="/">
            {auth.user ? (
              <App onLogOut={auth.logOut} />
            ) : (
              <AnonymousApp onLogIn={auth.logIn} />
            )}
          </Route>

          <Route exact path="/auth">
            <AuthHandler onHandleAuthCallback={auth.handleRedirectCallback} />
          </Route>
        </>
      )
  }
}

export default Root
