import express from 'express'
import pool from './config/db.js'
import "dotenv/config"
import cors from "cors"

//routes
import authRoutes from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

const app = express()


app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/job", jobRoutes)
app.use("/users", usersRoutes)


app.listen(8000, () => console.log('Server running on port 8000'))


