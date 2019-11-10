import createContextWrapper from "../common/createContextWrapper"
import { AuthUser } from "./types"

type RequiredAuthProps = {
  user: AuthUser
  token: string
  logOut: () => void
}

export const useRequiredAuthContext = createContextWrapper.simple<
  RequiredAuthProps
>()

type AnonymousAuthProps = {
  logIn: () => void
  isPending: boolean
}

export const useAnonymousAuthContext = createContextWrapper.simple<
  AnonymousAuthProps
>()
