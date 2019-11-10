export type TimelineApiResponse = {
  data: TimelineData
}

export type TimelineData = {
  media: TimelineImage[]
  cursor?: number
}

export type TimelineImage = {
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
