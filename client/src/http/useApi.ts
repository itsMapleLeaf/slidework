import { useCallback } from "react"
import useSWR from "swr"
import { useAuthContext } from "../auth/useAuthContext"
import fetchJson from "./fetchJson"

export function useTimeline() {
  const auth = useAuthContext()

  const fetchWithToken = useCallback(
    (url: string) =>
      fetchJson(url, { headers: { Authorization: `Bearer ${auth.token}` } }),
    [auth.token],
  )

  const { data } = useSWR(`/api/timeline`, fetchWithToken, { suspense: true })

  return data
}
