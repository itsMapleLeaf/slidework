// @ts-check
import { ManagementClient } from "auth0"
import dotenv from "dotenv"
import express from "express"
import jwt from "express-jwt"
import jwksRsa from "jwks-rsa"
import path from "path"
import Twit from "twit"

dotenv.config({ path: path.join(__dirname, `../.env.local`) })

const authClient = new ManagementClient({
  clientId: process.env.API_AUTH0_CLIENT_ID,
  clientSecret: process.env.API_AUTH0_CLIENT_SECRET,
  domain: process.env.API_AUTH0_DOMAIN,
} as any)

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.API_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.API_AUTH0_DOMAIN}/`,
  algorithm: ["RS256"],
})

const app = express()

app.get("/api/timeline", checkJwt, async (req, res, next) => {
  try {
    // @ts-ignore
    const userId = req.user.sub
    const user = await authClient.getUser({ id: userId })

    // @ts-ignore
    const accessToken = user.identities[0].access_token
    // @ts-ignore
    const accessTokenSecret = user.identities[0].access_token_secret

    const twitterClient = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY!,
      consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET!,
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
    })

    const { data } = await twitterClient.get("statuses/home_timeline", {
      exclude_replies: true,
    })

    res.send({ data })
  } catch (error) {
    next(error)
  }
})

app.listen(3001, () => console.log("API listening on 3001"))
