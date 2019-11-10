import { useEffect, useState, useTransition } from "react"
import { useRequiredAuthContext } from "../auth/authContext"
import FetchResource from "../http/FetchResource"

type TimelineApiResponse = {
  data: {
    media: TimelineImage[]
    cursor?: number
  }
}

type TimelineImage = {
  id: number
  url: string
  tweet: {
    url: string
    content: string
    date: string
  }
  user: {
    avatarUrl: string
    username: string
    displayName: string
  }
}

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
        setResource(
          new FetchResource(
            `${process.env.REACT_APP_API_ROOT}/api/timeline${params}`,
            options,
          ),
        )
      })
    }
  }, [cursor, startTransition, token])

  return resource ? resource.read().data : { media: [] }
}
