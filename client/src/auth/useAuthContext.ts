import { useMemo, useState, useTransition } from "react"
import createContextWrapper from "../common/createContextWrapper"
import AuthResource from "./AuthResource"

function useAuth({ resource: initialResource }: { resource: AuthResource }) {
  const [resource, setResource] = useState(initialResource)
  const [startTransition] = useTransition()

  return useMemo(
    () => ({
      readUser: () => resource.readUser(),
      readToken: () => resource.readToken(),
      logIn: () => {
        startTransition(() => {
          setResource(new AuthResource({ logIn: true }))
        })
      },
      logOut: () => resource.logOut(),
    }),
    [resource, startTransition],
  )
}

export const useAuthContext = createContextWrapper(useAuth)
