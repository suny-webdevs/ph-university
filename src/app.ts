import express from "express"
import cors from "cors"
import { Application, Request, Response } from "express"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"
import router from "./app/routes"

const app: Application = express()

app.use(express.json())
app.use(cors())

// Application routes
app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Welcome to PH University" })
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
