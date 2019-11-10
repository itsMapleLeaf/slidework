import { ErrorRequestHandler } from "express"
import { HttpError } from "./http-error"

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.send({ error: { message: err.message, status: err.status } })
  } else {
    res.send({ error: { message: "An internal error occurred" } })
  }
  console.error(err)
}
