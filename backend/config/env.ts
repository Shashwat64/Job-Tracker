import 'dotenv/config'

const JWT_SECRET_VALUE = process.env.JWT_SECRET
if (!JWT_SECRET_VALUE) throw new Error('Missing')

export const JWT_SECRET = JWT_SECRET_VALUE