import stringify from "fast-json-stable-stringify"
import Twit from "twit"
import { Cache } from "./cache"

type ExtractedMedia = {
  media: unknown[]
  lastTweetId?: string
}

const cache = new Cache<ExtractedMedia>()

const extractTweetText = (text: string) =>
  text
    .replace(/\s*https:\/\/t\.co\S+\s*/gim, " ")
    .replace(/rt\s+@[a-z0-9-_]+\:\s*/i, "")
    .trim()

export class TwitterClient {
  private client: Twit

  constructor(private clientOptions: Twit.Options) {
    this.client = new Twit(clientOptions)
  }

  async getTimelineMedia(lastTweetId?: string) {
    const key = stringify({ lastTweetId, options: this.clientOptions })
    const cachedData = cache.get(key)
    if (cachedData) return cachedData

    const tweets = await this.getTimelineTweets(lastTweetId)
    const data = await this.extractMediaFromTweets(tweets)
    cache.add(key, data)
    return data
  }

  private async getTimelineTweets(lastTweetId?: string) {
    const { data } = await this.client.get("statuses/home_timeline", {
      count: 200,
      max_id: lastTweetId,
      exclude_replies: true,
    })

    // if we include max_id, the last tweet from the previous batch is returned,
    // so we wanna exclude that
    return (data as any[]).slice(lastTweetId ? 1 : 0)
  }

  private async extractMediaFromTweets(tweets: any[]): Promise<ExtractedMedia> {
    if (tweets.length === 0) {
      return { media: [] }
    }

    const media: unknown[] = []

    for (const tweet of tweets) {
      const originalMedia: any[] = tweet.entities?.media || []

      const extractedMedia = originalMedia
        // the "type" property is always photo for some reason,
        // so we'll rely on the URL instead
        .filter((media) => media.expanded_url.includes("photo"))
        .map((media) => ({
          id: media.id,
          url: media.media_url_https,
          tweet: {
            url: media.expanded_url,
            content: extractTweetText(tweet.text || ""),
            date: tweet.created_at,
          },
          user: {
            avatarUrl: tweet.user.profile_image_url_https,
            username: tweet.user.screen_name,
            displayName: tweet.user.name,
          },
        }))

      media.push(...extractedMedia)
    }

    return { media, lastTweetId: tweets[tweets.length - 1]?.id }
  }
}
