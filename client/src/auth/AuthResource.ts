import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { AuthUser } from "./types"

type InitOptions = {
  logIn?: boolean
}

type AuthResourceState =
  | { type: "loading" }
  | { type: "authenticated"; user: AuthUser; token: string }
  | { type: "anonymous" }
  | { type: "error"; error: any }

export default class AuthResource {
  private state: AuthResourceState = { type: "loading" }
  private client?: Auth0Client
  private promise?: Promise<unknown>

  private constructor(options: InitOptions = {}) {
    this.promise = this.init(options)
  }

  static forAppInit() {
    return new AuthResource()
  }

  static forLogin() {
    return new AuthResource({ logIn: true })
  }

  logOut = () => {
    this.client?.logout({
      returnTo: window.location.origin,
    })
  }

  read = () => {
    switch (this.state.type) {
      case "loading":
        throw this.promise
      case "error":
        throw this.state.error
      case "anonymous":
        return undefined
      case "authenticated": {
        const { user, token } = this.state
        return { user, token }
      }
    }
  }

  private init = async (options: InitOptions) => {
    try {
      this.client = await createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN!,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      })

      if (options.logIn) {
        await this.client.loginWithRedirect()
      }

      const params = new URLSearchParams(window.location.search)
      if (params.has("code")) {
        await this.client.handleRedirectCallback()
        window.history.replaceState({}, document.title, "/")
      }

      if (await this.client.isAuthenticated()) {
        const [user, token] = await Promise.all([
          this.client.getUser(),
          this.client.getTokenSilently(),
        ])
        this.state = { type: "authenticated", user, token }
      } else {
        this.state = { type: "anonymous" }
      }
    } catch (error) {
      this.state = { type: "error", error }
    }
  }
}
