import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { AuthUser } from "./types"

type InitOptions = {
  logIn?: boolean
}

export default class AuthResource {
  private status: "loading" | "success" | "error" = "loading"
  private client?: Auth0Client
  private error?: any
  private user?: AuthUser
  private token?: string
  private promise?: Promise<unknown>

  constructor(options: InitOptions = {}) {
    this.promise = this.init(options)
  }

  logOut = () => {
    this.client?.logout()
  }

  readUser = () => {
    switch (this.status) {
      case "loading":
        throw this.promise
      case "error":
        throw this.error
      case "success":
        return this.user
    }
  }

  readToken = () => {
    switch (this.status) {
      case "loading":
        throw this.promise
      case "error":
        throw this.error
      case "success":
        return this.token
    }
  }

  private init = async (options: InitOptions) => {
    try {
      this.client = await createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN!,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
        redirect_uri: process.env.REACT_APP_AUTH_CALLBACK_URL,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      })

      if (options.logIn) {
        await this.client.loginWithPopup()
      }

      const isAuthenticated = await this.client.isAuthenticated()

      const [user, token] = isAuthenticated
        ? await Promise.all([
            this.client.getUser(),
            this.client.getTokenSilently(),
          ])
        : []

      this.user = user
      this.token = token

      this.status = "success"
    } catch (error) {
      this.error = error
      this.status = "error"
    }
  }
}
