import compression from "compression"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import path from "path"
import { checkJwt } from "./check-jwt"
import { handleError } from "./handle-error"
import { handleTimeline } from "./handle-timeline"

dotenv.config({ path: path.join(__dirname, `../.env.local`) })

const app = express()
app.use(cors())
app.use(compression())
app.get("/api/timeline", checkJwt, handleTimeline)
app.use(express.static(path.join(__dirname, `../../client/build`)))
app.use(handleError)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`API listening on ${port}`))
