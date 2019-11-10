import { ManagementClient } from "auth0"
import { RequestHandler } from "express"
import env from "./env"
import { HttpError } from "./http-error"
import { TwitterClient } from "./twitter-client"

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

    const twitterClient = new TwitterClient({
      consumer_key: env.twitter.consumerKey,
      consumer_secret: env.twitter.consumerApiSecret,
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
    })

    const result = await twitterClient.getMedia(req.query.cursor)
    res.send({ data: { media: result.media, cursor: result.lastTweetId } })
  } catch (error) {
    next(error)
  }
}
