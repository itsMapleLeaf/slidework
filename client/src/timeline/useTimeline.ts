import { useEffect, useState, useTransition } from "react"
import { useRequiredAuthContext } from "../auth/authContext"
import FetchResource from "../http/FetchResource"
import { TimelineApiResponse } from "./types"

export function useTimeline(cursor?: number) {
  const [resource, setResource] = useState<FetchResource<TimelineApiResponse>>()
  const [startTransition] = useTransition()
  const { token } = useRequiredAuthContext()

  useEffect(() => {
    if (token) {
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      }

      const params = cursor ? `?cursor=${cursor}` : ``

      startTransition(() => {
        setResource(new FetchResource(`/api/timeline${params}`, options))
      })
    }
  }, [cursor, startTransition, token])

  return resource ? resource.read().data : { media: [] }
}
