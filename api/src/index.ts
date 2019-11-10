import dotenv from "dotenv"
import express from "express"
import path from "path"
import { checkJwt } from "./check-jwt"
import { handleError } from "./handle-error"
import { handleTimeline } from "./handle-timeline"

dotenv.config({ path: path.join(__dirname, `../.env.local`) })

const app = express()
app.get("/api/timeline", checkJwt, handleTimeline)
app.use(handleError)
app.listen(3001, () => console.log("API listening on 3001"))
