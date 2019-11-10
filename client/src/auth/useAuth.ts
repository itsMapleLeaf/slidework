import { useMemo, useState, useTransition } from "react"
import AuthResource from "./AuthResource"

export default function useAuth(initialResource: AuthResource) {
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
