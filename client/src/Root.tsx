import React, { useEffect } from "react"
import { Route, useHistory } from "react-router-dom"
import { AuthUser, useAuth } from "./auth"

function AnonymousApp({ onLogIn }: { onLogIn: () => void }) {
  return (
    <>
      <nav>
        <button onClick={onLogIn}>log in</button>
      </nav>
      <main>hi, please log in</main>
    </>
  )
}

function AuthenticatedApp({
  user,
  onLogOut,
}: {
  user: AuthUser
  onLogOut: () => void
}) {
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

function AuthHandler({
  onHandleAuthCallback,
}: {
  onHandleAuthCallback: () => void
}) {
  const history = useHistory()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has("code")) {
      onHandleAuthCallback()
      history.replace("/")
    }
  }, [history, onHandleAuthCallback])

  return null
}

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
              <AuthenticatedApp user={auth.user} onLogOut={auth.logOut} />
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
