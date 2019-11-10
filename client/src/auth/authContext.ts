import { useMemo, useState, useTransition } from "react"
import createContextWrapper from "../common/createContextWrapper"
import AuthResource from "./AuthResource"
import { AuthUser } from "./types"

export function useAuth(initialResource: AuthResource) {
  const [resource, setResource] = useState(initialResource)
  const [startTransition, isPending] = useTransition()

  return useMemo(
    () => ({
      readUser: resource.readUser,
      readToken: resource.readToken,
      isPending,
      logOut: resource.logOut,
      logIn: () => {
        startTransition(() => {
          setResource(new AuthResource({ logIn: true }))
        })
      },
    }),
    [isPending, resource, startTransition],
  )
}

type RequiredAuthProps = { user: AuthUser; token: string; logOut: () => void }
type AnonymousAuthProps = { logIn: () => void; isPending: boolean }

export const useRequiredAuthContext = createContextWrapper.simple<
  RequiredAuthProps
>()
export const useAnonymousAuthContext = createContextWrapper.simple<
  AnonymousAuthProps
>()
