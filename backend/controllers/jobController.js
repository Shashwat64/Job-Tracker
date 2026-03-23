import pool from '../config/db.js'
import cloudinary from '../config/cloudinary.js'

export const uploadResume = async (req, res) => {
  const { jobId } = req.params
  const userId = req.userId

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'resumes', resource_type: 'raw' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(req.file.buffer)
      })
    }

    const cloudinaryResult = await uploadToCloudinary()
    const resumeUrl = cloudinaryResult.secure_url

    const dbResult = await pool.query(
      `UPDATE applications SET resume_url = $1 
       WHERE id = $2 AND user_id = $3 
       RETURNING *`,
      [resumeUrl, jobId, userId]
    )

    if (dbResult.rows.length === 0) {
      return res.status(404).json({ message: "Job not found or not yours" })
    }

    res.status(200).json({
      message: "Resume uploaded",
      resume_url: resumeUrl,
      job: dbResult.rows[0]
    })

  } catch (err) {
    console.error("Upload error:", err)
    res.status(500).json({ message: "Server error during upload" })
  }
}