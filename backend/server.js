import express from 'express'
import "dotenv/config"
import cors from "cors"
import cookieParser from 'cookie-parser'

//routes
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()


app.use(cors({
  origin: true, // reflects whatever origin the request comes from
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/job",  jobRoutes)
app.use("/users",  authMiddleware, usersRoutes)


app.listen(8000, () => console.log('Server running on port 8000'))


