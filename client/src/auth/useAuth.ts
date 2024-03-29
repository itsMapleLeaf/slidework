import { useMemo, useState, useTransition } from "react"
import AuthResource from "./AuthResource"

export default function useAuth(initialResource: AuthResource) {
  const [resource, setResource] = useState(initialResource)
  const [startTransition, isPending] = useTransition()
  const state = resource.read()

  return useMemo(
    () => ({
      state,
      isPending,
      logOut: resource.logOut,
      logIn: () => {
        startTransition(() => {
          setResource(AuthResource.forLogin())
        })
      },
    }),
    [isPending, resource.logOut, startTransition, state],
  )
}
