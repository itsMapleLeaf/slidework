import { useEffect, useState } from "react"
import { useAuthContext } from "../auth/useAuthContext"
import FetchResource from "./FetchResource"

export function useTimeline() {
  const auth = useAuthContext()
  const token = auth.readToken()

  const [resource, setResource] = useState<FetchResource>()

  useEffect(() => {
    if (token) {
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      }
      setResource(new FetchResource(`/api/timeline`, options))
    }
  }, [token])

  return resource?.read()
}
