import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/user.route"
import dbConnect from "./util/db.connect"
import { errorHandler } from "./middewares/error.middleware"
import myRestaurantRoute from "./routes/myrestaurant.route"

dotenv.config()
dbConnect()


const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())

app.get("/health", async(req: Request, res: Response)=>{
     res.send({message: "health is OK!"})
})

app.use('/api/my', userRouter)
app.use("/api/my", myRestaurantRoute)
app.use(errorHandler)


app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})
