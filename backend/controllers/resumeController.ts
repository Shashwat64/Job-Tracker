import pool from '../config/db.js'
import cloudinary from '../config/cloudinary.js'

// upload resume to cloudinary and save to resumes table
export const uploadResume = async (req, res) => {
  const userId = req.userId
  const { name } = req.body  // user gives the resume a name like "SWE Resume v2"

  try {
    const cloudinaryResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: 'resumes', 
          resource_type: 'raw'
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(req.file.buffer)
    })

    const fileUrl = cloudinaryResult.secure_url

    const dbResult = await pool.query(
      `INSERT INTO resumes (user_id, name, file_url) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [userId, name, fileUrl]
    )

    res.status(201).json({
      message: "Resume uploaded",
      resume: dbResult.rows[0]
    })

  } catch (err) {
    console.error("Upload error:", err)
    res.status(500).json({ message: "Server error during upload" })
  }
}

// get all resumes for the logged in user
export const getResumes = async (req, res) => {
  const userId = req.userId

  try {
    const result = await pool.query(
      `SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    )
    res.status(200).json({ resumes: result.rows })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// delete a resume
export const deleteResume = async (req, res) => {
  const userId = req.userId
  const { resumeId } = req.params

  try {
    const result = await pool.query(
      `DELETE FROM resumes WHERE id = $1 AND user_id = $2 RETURNING *`,
      [resumeId, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resume not found or not yours" })
    }

    res.status(200).json({ message: "Resume deleted" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}