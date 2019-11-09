import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { useEffect, useMemo, useState } from "react"
import createContextWrapper from "../common/createContextWrapper"
import { AuthUser } from "./types"

function useAuth() {
  const [status, setStatus] = useState<"init" | "loading" | "loaded">("init")
  const [client, setClient] = useState<Auth0Client>()
  const [user, setUser] = useState<AuthUser>()
  const [token, setToken] = useState<string>()

  useEffect(() => {
    const createClient = async () => {
      setStatus("loading")

      const client = await createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN!,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
        redirect_uri: process.env.REACT_APP_AUTH_CALLBACK_URL,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      })

      const isAuthenticated = await client.isAuthenticated()

      const [user, token] = isAuthenticated
        ? await Promise.all([client.getUser(), client.getTokenSilently()])
        : []

      setClient(client)
      setUser(user)
      setToken(token)
      setStatus("loaded")
    }

    createClient()
  }, [])

  return useMemo(() => {
    function logIn() {
      if (client) client.loginWithRedirect()
    }

    function logOut() {
      if (client) client.logout()
    }

    async function handleRedirectCallback() {
      if (!client || status === "loading") return

      setStatus("loading")

      await client.handleRedirectCallback()
      const user = await client.getUser()

      setStatus("loaded")
      setUser(user)
    }

    return {
      logIn,
      logOut,
      user,
      token,
      status,
      handleRedirectCallback,
    }
  }, [client, status, token, user])
}

export const useAuthContext = createContextWrapper(useAuth)
