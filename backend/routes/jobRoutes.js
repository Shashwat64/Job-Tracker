import express from 'express'
import pool from '../config/db.js'
import authMiddleware from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import { uploadResume } from '../controllers/jobController.js'

const jobRoutes = express.Router()

// authMiddleware checks JWT first
// upload.single('resume') runs Multer — 'resume' must match the field name from the frontend form
// uploadResume is the controller that saves the URL to DB
jobRoutes.post('/upload-resume/:jobId', authMiddleware, upload.single('resume'), uploadResume)

export default jobRoutes