import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secretKey } from "../config/jwtToken";
import dotenv from "dotenv";
import { CustomRequest } from "../controller/seat"; 
import mongoose from "mongoose";
import { AUTH_MESSAGES } from "../constant"; 

dotenv.config();

interface UserPayload extends JwtPayload {
  id: mongoose.Types.ObjectId; 
  email: string;
  role: string;
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: AUTH_MESSAGES.MISSING_TOKEN });
    return;
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: AUTH_MESSAGES.INVALID_FORMAT });
    return;
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err || !user) {
      return res.status(403).json({ message: AUTH_MESSAGES.FORBIDDEN });
    }
    (req as unknown as CustomRequest).user = user as UserPayload; 
    next();
  });
};

const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.log(err)
    throw new Error(AUTH_MESSAGES.INVALID_TOKEN);
  }
};

const authMiddleware = { authenticateToken, verifyToken };
export default authMiddleware;
export { UserPayload };
