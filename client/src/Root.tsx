import React from "react"
import { Route } from "react-router-dom"
import AnonymousApp from "./app/AnonymousApp"
import App from "./app/App"
import AuthHandler from "./auth/AuthHandler"
import { useAuth } from "./auth/useAuth"

function Root() {
  const auth = useAuth()

  switch (auth.status) {
    case "init":
      return null

    case "loading":
      return <p>Loading...</p>

    case "loaded":
      return (
        <>
          <Route exact path="/">
            {auth.user ? (
              <App user={auth.user} onLogOut={auth.logOut} />
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

  // const [secret, setSecret] = useState<any>()

  // async function getSecret() {
  //   const token = await auth.getTokenSilently()

  //   const result = await fetchJson(`/api/timeline`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })

  //   setSecret(result)
  // }

  // return (
  //   <main>
  //     <button onClick={auth.logIn}>log in</button>
  //     <button onClick={auth.logOut}>log out</button>
  //     <button onClick={getSecret}>get the secret</button>
  //     <pre>{JSON.stringify(auth.user, undefined, 2)}</pre>
  //     <pre>{JSON.stringify(secret, undefined, 2)}</pre>
  //   </main>
  // )
}

export default Root
