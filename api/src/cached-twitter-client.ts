import stringify from "fast-json-stable-stringify"
import Twit from "twit"
import { Cache } from "./cache"

export class CachedTwitterClient {
  private static cache = new Cache()

  private client: Twit

  constructor(private clientOptions: Twit.Options) {
    this.client = new Twit(clientOptions)
  }

  async get(endpoint: string, params: Twit.Params = {}) {
    const key = stringify({ options: this.clientOptions, endpoint, params })
    const cachedData = CachedTwitterClient.cache.get(key)
    if (cachedData) return cachedData

    const { data } = await this.client.get(endpoint, params)
    CachedTwitterClient.cache.add(key, data)
    return data
  }
}
