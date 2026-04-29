import  pool from "./config/db.js"

const result = await pool.query(
  "SELECT * FROM users"
)

console.log(result.rows)
