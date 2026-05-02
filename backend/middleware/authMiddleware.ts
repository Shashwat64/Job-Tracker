import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'


const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.token

  console.log("TOKEN in /authMiddelware:", req.cookies.token)

  try {
    // console.log("/authMiddelware ran",token)
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { id: string }

    req.user = decoded
    req.userId = decoded.id
    const user = jwt.verify(token, JWT_SECRET);

    next()

  } catch (err) {
    if(err instanceof Error){
      return res.status(401).json({JWTERROR: err.message, message: "Unauthorized from middleware"});
    }else{
      return res.status(500).json({message: "Server Error"})
    }
}
}

export default authMiddleware