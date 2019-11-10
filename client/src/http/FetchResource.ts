import fetchJson from "./fetchJson"

type FetchResourceStatus<T> =
  | { type: "pending" }
  | { type: "success"; data: T }
  | { type: "error"; error: any }

export default class FetchResource<T = unknown> {
  private promise: Promise<void>
  private status: FetchResourceStatus<T> = { type: "pending" }

  constructor(url: string, options?: RequestInit) {
    this.promise = (async () => {
      try {
        this.status = {
          type: "success",
          data: await fetchJson<T>(url, options),
        }
      } catch (error) {
        this.status = { type: "error", error }
      }
    })()
  }

  read = () => {
    switch (this.status.type) {
      case "pending":
        throw this.promise
      case "error":
        throw this.status.error
      case "success":
        return this.status.data
    }
  }
}
