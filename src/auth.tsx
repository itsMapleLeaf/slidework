import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { useEffect, useState } from "react"

type AuthUser = {
  name: string
  nickname: string
  picture: string
  updated_at: string // ISO date
  sub: string
}

export function useAuth() {
  const [client, setClient] = useState<Auth0Client>()
  const [user, setUser] = useState<AuthUser>()

  useEffect(() => {
    const createClient = async () => {
      const client = await createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN!,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
        redirect_uri: process.env.REACT_APP_AUTH_CALLBACK_URL,
      })

      const user = await client.getUser()

      setClient(client)
      setUser(user)
    }

    createClient()
  }, [])

  useEffect(() => {
    if (!client) return

    const handleRedirect = async () => {
      const params = new URLSearchParams(window.location.search)

      if (params.has("code")) {
        await client.handleRedirectCallback()
        const user = await client.getUser()

        setUser(user)
      }
    }

    handleRedirect()
  }, [client])

  function logIn() {
    if (client) client.loginWithRedirect()
  }

  function logOut() {
    if (client) client.logout()
  }

  return { logIn, logOut, user }
}
