import { useMemo, useState, useTransition } from "react"
import AuthResource from "./AuthResource"

export default function useAuth(initialResource: AuthResource) {
  const [resource, setResource] = useState(initialResource)
  const [startTransition, isPending] = useTransition()
  const state = resource.readState()

  return useMemo(
    () => ({
      state,
      isPending,
      logOut: resource.logOut,
      logIn: () => {
        startTransition(() => {
          setResource(new AuthResource({ logIn: true }))
        })
      },
    }),
    [isPending, resource.logOut, startTransition, state],
  )
}
