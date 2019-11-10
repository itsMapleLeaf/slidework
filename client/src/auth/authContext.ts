import createContextWrapper from "../common/createContextWrapper"
import { AuthUser } from "./types"

type RequiredAuthProps = { user: AuthUser; token: string; logOut: () => void }
type AnonymousAuthProps = { logIn: () => void; isPending: boolean }

export const useRequiredAuthContext = createContextWrapper.simple<
  RequiredAuthProps
>()
export const useAnonymousAuthContext = createContextWrapper.simple<
  AnonymousAuthProps
>()
