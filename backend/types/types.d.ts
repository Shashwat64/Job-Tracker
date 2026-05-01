import { JwtPayload } from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload
    userId?: string
    file?: Express.Multer.File
  }
}