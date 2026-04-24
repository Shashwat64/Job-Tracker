import express from 'express'
import pool from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import authMiddleware from '../middleware/authMiddleware.js'

const authRoutes = express.Router()

authRoutes.post('/signup', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body

  try {

    // check if user already exists with that email
    const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    console.log(existingEmail.rows)

    if (existingEmail.rows.length > 0) {
      return res.status(400).json({ error: 'email already exists' })
    }

    const existingUsername = await pool.query('SELECT * FROM users WHERE LOWER(username) = LOWER($1)', [username])

    if (existingUsername.rows.length > 0) {
      return res.status(400).json({ error: 'username already exists' })
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // save user to db
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, username, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING first_name, last_name, id, email, username, id',
      [firstName, lastName, email, username, hashedPassword]

      // RETURNING means give me back these columns after insert
      // we never return password, even hashed
    )
    const user = result.rows[0]
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.cookie("token", token, {
      httpOnly: true,    // JS can't access it, safer against XSS
      secure: true,      // only sent over HTTPS
      sameSite: "none", // protects against CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.status(201).json({ success: true, user: result.rows[0] })
    // 201 means "created" — more specific than 200

  } catch (err) {
    res.status(500).json({ error: err.message })
    // 500 means something went wrong on our end
  }
})

authRoutes.post('/signin', async (req, res) => {
  const { email, password } = req.body

  // return res.status(200).json({
  //   message:"this is message from server",
  //   email,
  //   password
  // })

  try {
    // find user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]

    console.log(user)

    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' })
    }

    // plain text comparison for now
    const match = await bcrypt.compare(password, user.password_hash)

    // 4. if wrong password
    if (!match) {
      return res.status(400).json({ error: 'invalid credentials' })
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
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ success: true })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}) 

authRoutes.get('/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user)
})

authRoutes.post('/signout', (req, res) => {
  res.clearCookie('token')

  res.json({ success: true })
})


export default authRoutes 
