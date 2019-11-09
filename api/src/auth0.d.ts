import "auth0"

declare module "auth0" {
  export interface Identity {
    access_token?: string
    access_token_secret?: string
  }
}
