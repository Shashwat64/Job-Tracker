import express from 'express'
import pool from '../config/db.js'
import authMiddleware from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import { uploadResume, getResumes, deleteResume} from '../controllers/resumeController.js'

const resumeRoutes = express.Router()

// authMiddleware checks JWT first
// upload.single('resume') runs Multer — 'resume' must match the field name from the frontend form
// uploadResume is the controller that saves the URL to DB
resumeRoutes.post('/upload', authMiddleware, upload.single('resume'), uploadResume)
resumeRoutes.get('/', authMiddleware, getResumes)
resumeRoutes.delete('/:resumeId', authMiddleware, deleteResume)

export default resumeRoutes