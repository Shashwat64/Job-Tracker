import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token

  // console.log("TOKEN:", req.cookies.token)

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;      
    req.userId = user.id; 
    next(); 

  } catch (err) {
  console.log("JWT ERROR:", err.message);
  return res.status(401).json({ message: "Unauthorized from middleware" });
}
}

export default authMiddleware