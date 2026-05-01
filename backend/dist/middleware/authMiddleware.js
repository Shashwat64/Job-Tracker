import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("TOKEN:", req.cookies.token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.id;
        const user = jwt.verify(token, JWT_SECRET);
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).json({ JWTERROR: err.message, message: "Unauthorized from middleware" });
        }
        else {
            return res.status(500).json({ message: "Server Error" });
        }
    }
};
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map