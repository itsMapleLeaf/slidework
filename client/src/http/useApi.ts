import { useMemo } from "react"
import { useAuthContext } from "../auth/useAuthContext"
import fetchJson from "./fetchJson"

export function useApi() {
  const auth = useAuthContext()

  return useMemo(() => {
    async function getTimeline() {
      const token = await auth.getTokenSilently()

      const result = await fetchJson(`/api/timeline`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return result
    }

    return { getTimeline }
  }, [auth])
}
