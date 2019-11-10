import { ManagementClient } from "auth0"
import { RequestHandler } from "express"
import Twit from "twit"
import env from "./env"
import { HttpError } from "./http-error"

const authClient = new ManagementClient({
  clientId: env.auth0.clientId,
  clientSecret: env.auth0.clientSecret,
  domain: env.auth0.domain,
} as any)

export const handleTimeline: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.sub
    if (!userId) {
      throw new HttpError("No userId found in JWT", 400)
    }

    const user = await authClient.getUser({ id: userId })

    const accessToken = user.identities?.[0].access_token
    const accessTokenSecret = user.identities?.[0].access_token_secret
    if (!accessToken || !accessTokenSecret) {
      throw new HttpError("No access token or secret found in auth0 user", 500)
    }

    const twitterClient = new Twit({
      consumer_key: env.twitter.consumerKey,
      consumer_secret: env.twitter.consumerApiSecret,
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
    })

    const media: unknown[] = []
    let cursor: string | undefined = req.params.lastId

    while (media.length < 20) {
      const { data } = await twitterClient.get("statuses/home_timeline", {
        count: 100,
        exclude_replies: true,
        max_id: cursor,
      })

      const tweets = data as any[]
      if (tweets.length === 0) break

      for (const tweet of tweets) {
        const originalMedia: any[] = tweet.entities?.media || []

        const extractedMedia = originalMedia.map((media) => ({
          id: media.id,
          url: media.media_url_https,
          tweetUrl: media.expanded_url,
        }))

        media.push(...extractedMedia)
      }

      cursor = tweets[tweets.length - 1].id
    }

    res.send({ data: { media, cursor } })
  } catch (error) {
    next(error)
  }
}
