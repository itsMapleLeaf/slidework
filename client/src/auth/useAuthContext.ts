import { useMemo, useState } from "react"
import createContextWrapper from "../common/createContextWrapper"
import AuthResource from "./AuthResource"

function useAuth({ resource: initialResource }: { resource: AuthResource }) {
  const [resource, setResource] = useState(initialResource)
  return useMemo(
    () => ({
      readUser: () => resource.readUser(),
      readToken: () => resource.readToken(),
      logIn: () => setResource(new AuthResource({ logIn: true })),
      logOut: () => resource.logOut(),
    }),
    [resource],
  )
}

export const useAuthContext = createContextWrapper(useAuth)
