import jwt from "express-jwt"
import jwksRsa from "jwks-rsa"
import env from "./env"

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${env.auth0.domain}/.well-known/jwks.json`,
  }),
  audience: env.auth0.audience,
  issuer: `https://${env.auth0.domain}/`,
  algorithm: ["RS256"],
})
