import { useMemo, useState, useTransition } from "react"
import createContextWrapper from "../common/createContextWrapper"
import AuthResource from "./AuthResource"

function useAuth({ resource: initialResource }: { resource: AuthResource }) {
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

export const useAuthContext = createContextWrapper(useAuth)
