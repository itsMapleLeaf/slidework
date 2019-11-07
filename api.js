const express = require("express")
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const dotenv = require("dotenv")

dotenv.config({ path: `${__dirname}/.env.local` })

const app = express()

const authConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"],
})

app.get("/api/test", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
  })
})

app.listen(3001, () => console.log("API listening on 3001"))
