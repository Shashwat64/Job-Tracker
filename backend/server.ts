import express from 'express'
import "dotenv/config"
import cors from "cors"
import cookieParser from 'cookie-parser'

//routes
import authRoutes from './routes/authRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()

const PORT = process.env.PORT || 8000

const allowedOrigins = [
  'https://job-tracker-b35k59wtt-shashwatrrawat-7439s-projects.vercel.app'
]

app.use(cookieParser())
app.use(cors({
   origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true)
    
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true)
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error('Not allowed by CORS'))
    }
  }, // reflects whatever origin the request comes from
  credentials: true
}))
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/resume", resumeRoutes)
app.use("/users", authMiddleware, usersRoutes)

console.log("SERVER FILE IS RUNNING")

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))