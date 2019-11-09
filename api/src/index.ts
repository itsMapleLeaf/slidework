// @ts-check
import { ManagementClient } from "auth0"
import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import jwt from "express-jwt"
import jwksRsa from "jwks-rsa"
import path from "path"
import Twit from "twit"
import { HttpError } from "./http-error"

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

  audience: process.env.API_AUTH0_AUDIENCE,
  issuer: `https://${process.env.API_AUTH0_DOMAIN}/`,
  algorithm: ["RS256"],
})

const app = express()

app.get("/api/timeline", checkJwt, async (req, res, next) => {
  try {
    const userId = req.user?.sub
    if (!userId) {
      throw new HttpError('No userId found in JWT', 400)
    }

    const user = await authClient.getUser({ id: userId })

    const accessToken = user.identities?.[0].access_token
    const accessTokenSecret = user.identities?.[0].access_token_secret
    if (!accessToken || !accessTokenSecret) {
      throw new HttpError('No access token or secret found in auth0 user', 500)
    }

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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.send({error:{message:err.message,status:err.status}})
  } else {
    res.send({ error: {message:"An internal error occurred"} })
  }
})

app.listen(3001, () => console.log("API listening on 3001"))
