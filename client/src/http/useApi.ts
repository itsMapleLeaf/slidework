import { useEffect, useState } from "react"
import { useRequiredAuthContext } from "../auth/authContext"
import FetchResource from "./FetchResource"

type TimelineApiResponse = {
  data: {
    media: TimelineImage[]
    cursor?: string
  }
}

type TimelineImage = {
  id: number
  url: string
  tweetUrl: string
}

export function useTimeline() {
  const [resource, setResource] = useState<FetchResource<TimelineApiResponse>>()
  const { token } = useRequiredAuthContext()

  useEffect(() => {
    if (token) {
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      }
      setResource(new FetchResource(`/api/timeline`, options))
    }
  }, [token])

  return resource ? resource.read().data : { media: [] }
}
