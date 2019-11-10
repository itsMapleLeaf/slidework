import { useEffect, useState } from "react"
import { useRequiredAuthContext } from "../auth/authContext"
import FetchResource from "./FetchResource"

export function useTimeline() {
  const [resource, setResource] = useState<FetchResource>()
  const { token } = useRequiredAuthContext()

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
