import express from 'express'
import pool from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authRoutes = express.Router()

authRoutes.post('/register', async (req, res) => {
  const { email, username, password } = req.body

  try {

    // check if user already exists with that email
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'user already exists' })
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // save user to db
    const result = await pool.query(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, email, username',
      [email, username, hashedPassword]
      // RETURNING means give me back these columns after insert
      // we never return password, even hashed
    )

    res.status(201).json({ success: true, user: result.rows[0] })
    // 201 means "created" — more specific than 200

  } catch (err) {
    res.status(500).json({ error: err.message })
    // 500 means something went wrong on our end
  }
})

authRoutes.post('/signin', async (req, res) => {
  const { email, password } = req.body

  try {
    // find user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' })
    }

    // plain text comparison for now
    if (password !== user.password_hash) {
      return res.status(401).json({ error: 'invalid credentials' })
    }

    // create jwt token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ success: true })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}) 

authRoutes.get('/me', (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'not logged in' })
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)

    res.json(user)

  } catch {
    res.status(401).json({ error: 'invalid token' })
  }
})

authRoutes.post('/logout', (req, res) => {
  res.clearCookie('token')

  res.json({ success: true })
})


export default authRoutes
