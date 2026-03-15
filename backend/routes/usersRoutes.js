import express from 'express'

import pool from '../config/db.js'

const usersRoutes = express.Router()

usersRoutes.get('/', async (req, res) => {
  const result = await pool.query("SELECT * FROM users")
  res.json(result.rows)
})

usersRoutes.get('/:id', async(req, res)=>{

  const userId = req.params.id

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Send the user object to frontend
    res.json({
      message: "this is the data from /:id",
      data:result.rows[0]
    }); // or res.send(result.rows[0])
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
})

usersRoutes.post("/", async (req, res) => {

  // const { email, password } = req.body

  const getRes = await fetch("http://localhost:8000/users")
  const data = await getRes.json()

  const email = req.body.email
  const password = req.body.password

  const exists = data.some(info => info.email === email)

  console.log("email is ",email)
  console.log("password is ",password)
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [1]);

    if (result.rowCount === 0) {
      // User not found
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Send the user object to frontend
    res.json(result.rows[0]); // or res.send(result.rows[0])
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
})

usersRoutes.delete('delete/:id', async(req, res)=>{
  // res.status(201).send("delete id is", req.params.id)

  const userId = req.params.id 

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }

})

export default usersRoutes