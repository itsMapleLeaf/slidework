import dotenv from "dotenv"
import { join } from "path"

dotenv.config({ path: join(__dirname, "../.env.local") })

function getRequiredEnvVariable(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`environment variable "${name}" is not defined :(`)
  }
  return value
}

export default {
  auth0: {
    domain: getRequiredEnvVariable("API_AUTH0_DOMAIN"),
    clientId: getRequiredEnvVariable("API_AUTH0_CLIENT_ID"),
    clientSecret: getRequiredEnvVariable("API_AUTH0_CLIENT_SECRET"),
    audience: getRequiredEnvVariable("API_AUTH0_AUDIENCE"),
  },
  twitter: {
    consumerKey: getRequiredEnvVariable("TWITTER_CONSUMER_KEY"),
    consumerApiSecret: getRequiredEnvVariable("TWITTER_CONSUMER_API_SECRET"),
  },
}
